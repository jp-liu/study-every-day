## 响应式系统

说道 `vue` 大家都知道 `vue` 的双向数据绑定,让我们能够基于 **MVVM** 模型, 通过 **声明式** 变成的方式,操作数据和页面

![mvvm3](D:\project\github\study-everyday\src\vue\mini-vue\reactivity\images\mvvm3.png)

**vue** 作为中间层, 响应式系统,是不可或缺的部分,先来实现一个简单版本的 `reactivity` 响应式系统模块, 以这个为基础,才方便进行后面的功能实现

在 **vue3** 中, **reactivity** 模块作为一个单独模块,是可以作为工具,提供给别人使用的,所以相对独立, 方便阅读和搞懂这个在干嘛

---

### 1.1 Proxy 代理对象

**vue2** 中响应式是通过`Object.defineProperty` 这个 Api 的`get/set`来实现的

**vue3** 中是通过 `Proxy` 这个代理对象来实现,为什么需要变更呢,这个文章很多,我就说自己的拙见:

    1. **Proxy** 基于 `Reflect` 反射,可以代理几乎对象的所有行为,有十几种,包括 `get/set/deleteProperty/definePropertygetOwnPropertyDescriptor` 等等,争取做到无死角响应式啊

2. 第二点是 **Proxy** 是目前浏览器的研究方向,它在未来的表现只会比现在更好,更快

想学习的可以前往 **MDN** 了解 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

### 1.2 Reactivity

我们拥有了 **Proxy** 知道要代理对象了, 可以知道对象的属性值的变更, 那么在什么时候收集相关依赖,创建代理对象呢?

就是我们熟悉的一些函数了

`reactive/readonly`这些方法,将我们的对象,包装代理成为代理对象,并创建`getter/setter` 方法

最简版

```ts
export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const res = Reflect.get(target, key)
      // 进行依赖追踪
      track(target, key)
      return res
    }
  }),
  set(target, key, value) {
    const res = Reflect.set(target, key, value)

    // 触发更新
    trigger(target, key)
    return res
  }
}
```

由于我们需要区分 `isReadonly` 是否是只读对象, 所以我们通过闭包,来提供一个标识

```ts
function createGetter(isReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key)

    // 进行依赖追踪,由于只读对象不会发生改变,所以我们并不需要追踪
    if (!isReadonly) {
      track(target, key)
    }
    return res
  }
}
```

### 1.3 effect 副作用函数

通过使用 `reactive/readonly` 我们取得了代理对象, 而且应该也注意到了,其中有两个函数, **track/trigger** 这两个函数主要是进行依赖追踪和数据变更通知的

我们的响应式系统需要通过 `effect` 副作用函数来创建依赖, 在**vue**中是`render` 函数, 我们在 `render` 函数中, 会去访问代理对象的属性从而触发 `get` 得到我们的依赖,渲染函数, 然后在数据变更的时候,才能在 `set` 中, 通知渲染函数创建新的 `vnode` 进行`diff` 算法比较, 更新 `dom`, 这个时候我们来看个模型,看看是如何做的

![effect](D:\project\github\study-everyday\src\vue\mini-vue\reactivity\images\effect.png)

这是一个简版的模型和数据结构的实现, 在源码中,**vue** 将 `fn` 抽象成了一个类,进行了封装,方便实现更多的功能

看看代码

```ts
/**
 * @description 副作用函数,收集依赖
 * @param { Function } fn
 */
export function effect(fn, options?) {
  // 1.初始化
  const _effect = new ReactiveEffect(fn, options?.shceduler)

  extend(_effect, options)

  // 2.调用`run`方法,就是调用fn触发内部的`get/set`
  _effect.run()

  // 3.返回`runner`函数
  const runner: any = _effect.run.bind(activeEffect)
  runner.effect = _effect
  return runner
}
```

#### **ReactiveEffect**抽象出来的`fn`类

```ts
/**
 * @description 被收集的依赖函数类
 */
export class ReactiveEffect {
  private _fn: () => void

  public shceduler?: () => void | undefined

  deps: any[] = []

  constructor(fn: () => void, shceduler?: () => void) {
    this._fn = fn
    this.shceduler = shceduler
  }

  run() {
    // 1.设置依赖收集的目标为当前实例
    activeEffect = this
    // 2.执行`fn`,调用内部的`get`的时候,就可以收集`fn`了
    const result = this._fn()

    return result
  }
}
```

#### **track**: 收集依赖的 函数

```ts
/**
 * @description 调用`get`方法的时候,进行依赖收集
 * @param target 当前追踪对象
 * @param key 当前访问的`key`
 */
export function track(target, key)
  // console.log(`触发 track -> target: ${target} key:${key}`)

  // 获取当前追踪对象
  let depsMap = targetMap.get(target)
  // 判断是否存在依赖中,没有则添加
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  // @desc: 获取当前对象的`key`对应的依赖
  let dep = depsMap.get(key)
  // 没有则添加一个
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  // @desc: 手动触发`track`,允许其他人加入响应式系统, 如`ref`
  trackEffects(dep)
}

export function trackEffects(dep) {
  // @desc: 如果已经添加过了,避免重复添加
  if (!dep.has(activeEffect)) {
    // 将依赖加入对应的`dep`中
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}
```

#### **trigger: **触发依赖的变更方法

```ts
/**
 * @description 调用`set`方法的时候,触发变更函数
 * @param target 当前追踪对象
 * @param key 当前访问的`key`
 */
export function trigger(target, key) {
  // console.log(`触发 trigger -> target: ${target} key:${key}`)

  const depsMap = targetMap.get(target)
  const dep = depsMap.get(key)

  // @desc: 手动触发`trigger`,让其他人也可以加入响应式系统, 如`ref`
  triggerEffects(dep)
}

export function triggerEffects(dep) {
  for (const effect of dep) {
    if (effect.shceduler) {
      effect.shceduler()
    } else {
      effect.run()
    }
  }
}
```

### 1.4 API 实现

基础架子搭建完毕,通过模型和基础介绍,有了一个基本的概念,后面来具体实现一下 `Vue3` 中的各种 `API`

#### effect

看看基本实现

```ts
/**
 * @description 副作用函数,收集依赖
 * @param { Function } fn
 */
export function effect(fn, options?) {
  // 1.初始化
  const _effect = new ReactiveEffect(fn, options?.shceduler)

  // Object.assign 方便给实例添加属性,如 onStop,监听退出依赖系统的回调
  extend(_effect, options)

  // 2.调用`run`方法,就是调用fn触发内部的`get/set`
  _effect.run()

  // 3.返回`runner`函数
  const runner: any = _effect.run.bind(activeEffect)
  runner.effect = _effect
  return runner
}
```

**effect** 副作用函数需要搭配 `依赖` 使用, 也就是 `ReactiveEffect`,我们来看看具体的收集依赖操作

```ts
/**
 * @description 被收集的依赖函数类
 */
export class ReactiveEffect {
  private _fn: () => void
  // 响应式第一次触发后,让用户自己决定后续的 set 操作要做的事情
  public shceduler?: () => void | undefined
  onStop?: () => void
  deps: any[] = []
  active: boolean = true

  constructor(fn: () => void, shceduler?: () => void) {
    this._fn = fn
    this.shceduler = shceduler
  }

  run() {
    // 执行`stop`之后,应该避免收集依赖,不开启依赖收集开关
    // 因为退出响应式系统,仍然保留着 fn 函数的执行权力
    if (!this.active) {
      return this._fn()
    }

    // 1.开启开关,允许依赖收集
    shouldTrack = true
    // 2.设置依赖收集的目标
    activeEffect = this
    // 3.执行`fn`,调用内部的`get`的时候,就可以收集`fn`了
    const result = this._fn()
    // 4.关闭依赖收集开关
    shouldTrack = false

    return result
  }

  // 退出响应式系统
  stop() {
    // 是否在响应式系统中
    if (this.active) {
      clearupEffect(this)
      // 如果给了回调,则进行回调
      if (this.onStop) this.onStop()
      this.active = false
    }
  }
}
```

在 `run` 方法中调用了 `_fn` 方法,也就是调用的时候传入的, 这个函数内调用响应式对象 `activeEffect` 则会被设置,然后被收集进入响应式映射表中,也就是 `get` 的`track` 方法

```ts
/**
 * @description 调用`get`方法的时候,进行依赖收集
 * @param target 当前追踪对象
 * @param key 当前访问的`key`
 */
export function track(target, key) {
  // @desc: 不是收集状态,直接返回
  if (!isTracting()) return

  // console.log(`触发 track -> target: ${target} key:${key}`)

  // 获取当前追踪对象 `targetMap` 是全局变量,用于管控整个项目
  let depsMap = targetMap.get(target)
  // 判断是否存在依赖中,没有则添加
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  // @desc: 获取当前对象的`key`对应的依赖
  let dep = depsMap.get(key)
  // 没有则添加一个
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  // @desc: 手动触发`track`,允许其他人加入响应式系统, 如`ref`
  trackEffects(dep)
}

export function trackEffects(dep) {
  // @desc: 如果已经添加过了,避免重复添加
  if (!dep.has(activeEffect)) {
    // 将依赖加入对应的`dep`中
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}

export function isTracting() {
  return shouldTrack && activeEffect
}
```

当下次 响应式对象发生改变的时候就会触发 `set` 中的 `trigger` 进行函数的重新调用

```ts
/**
 * @description 调用`set`方法的时候,触发变更函数
 * @param target 当前追踪对象
 * @param key 当前访问的`key`
 */
export function trigger(target, key) {
  // console.log(`触发 trigger -> target: ${target} key:${key}`)

  const depsMap = targetMap.get(target)
  const dep = depsMap.get(key)

  // @desc: 手动触发`trigger`,让其他人也可以加入响应式系统, 如`ref`
  triggerEffects(dep)
}

export function triggerEffects(dep) {
  for (const effect of dep) {
    if (effect.shceduler) {
      // 如果用户需要自己拥有操作权,则采用这个方案
      effect.shceduler()
    } else {
      effect.run()
    }
  }
}
```

#### reactive/readonly

这两个方法是创建响应式对象的,这个就是通过 **Proxy** 来创建代理对象

```ts
// 通过封装,复用逻辑
export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandlers)
}

function createActiveObject(raw: any, baseHandler) {
  return new Proxy(raw, baseHandler)
}

function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key) {
    // isReactive()
    if (key === ReactiveFlag.IS_REACTIVE) {
      return !isReadonly
    }
    if (key === ReactiveFlag.IS_READONLY) {
      return isReadonly
    }

    const res = Reflect.get(target, key)

    if (shallow) {
      return res
    }

    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }

    // 进行依赖追踪
    if (!isReadonly) {
      track(target, key)
    }
    return res
  }
}

function createSetter(isReadonly = false) {
  return function set(target, key, value) {
    if (isReadonly) {
      // 不能设置,给报错信息
      console.warn(`Cannot be edited key: ${String(key)}, it is readonly`)
      return true
    }

    const res = Reflect.set(target, key, value)

    // 触发更新
    trigger(target, key)
    return res
  }
}

// 避免重复调用 `createGet/set` 可以通过缓存来做
const get = createGetter()
const set = createSetter()

const readonlyGet = createGetter(true)
const readonlySet = createSetter(true)
export const mutableHandlers = {
  get,
  set
}

export const readonlyHandlers = {
  get: readonlyGet,
  set: readonlySet
}
```

还有浅层的响应式对象 `shallowReactive/shallowReadonly`

#### shallowReactive/shallowReadonly

```ts
// Readonly 同理
export function shallowReadonly(raw) {
  return createActiveObject(raw, shallowReadonlyHandlers)
}

const shallowReadonlyGet = createGetter(true, true)
// set,就采用readonly的,因为都不能设置新值
export const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
})
```

#### isReactive/isReadonly/isProxy

```ts
// 通过触发get,来看有没有闭包标识
export const enum ReactiveFlag {
  IS_REACTIVE = '__v_reactive',
  IS_READONLY = '__v_readonly'
}
// 创建响应式对象的时候是通过闭包来操作的,那么是不是响应式对象,就能通过闭包的标识来提供
// if (key === ReactiveFlag.IS_REACTIVE) {
//    return !isReadonly
// }
// if (key === ReactiveFlag.IS_READONLY) {
//    return isReadonly
// }
export function isReactive(value) {
  return !!value[ReactiveFlag.IS_REACTIVE]
}

export function isReadonly(value) {
  return !!value[ReactiveFlag.IS_READONLY]
}

export function isProxy(value) {
  return isReactive(value) || isReadonly(value)
}
```

#### ref

其实尤大是推荐大家使用 `ref` 对象来操作的,因为 `reactive` 是有缺点的, 这涉及到赋值的差别, 比如对 `reactive` 的解构赋值,会失去响应式

看看简版实现

```ts
class RefImpl {
  private _value: any

  private _raw: any

  public dep: Set<ReactiveEffect>

  public __v_isRef = true

  constructor(value) {
    this._raw = value
    this._value = convert(value)
    this.dep = new Set()
  }

  get value() {
    // 如何加入响应式,手动`track`,那么需要自己`trigger`
    trackRefValue(this)
    return this._value
  }

  set value(newValue) {
    if (hasChanged(this._raw, newValue)) {
      this._raw = newValue
      this._value = convert(newValue)
      triggerEffects(this.dep)
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref) {
  if (isTracting()) {
    trackEffects(ref.dep)
  }
}

export function ref(value) {
  return new RefImpl(value)
}

export function isRef(ref) {
  return !!ref.__v_isRef
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref
}

export function proxyRef(objectWithRef) {
  return new Proxy(objectWithRef, {
    get(target, key) {
      // get 操作,提供解包后的结果
      return unRef(Reflect.get(target, key))
    },
    set(target, key, value) {
      // 如果新值是ref直接赋值,如果不是,则需要对value赋值
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value)
      }
      return Reflect.set(target, key, value)
    }
  })
}
```

#### computed

`computed` 的实现,是比较巧妙的,通过开关,来操控是否采用缓存, 没有调用 `get` 方法,就不会触发函数,拿到值, 他是 `懒` 的, 而且使用了 `shceduler` 让它可以在新值变更后,依然可以做到 `懒` 和获取新值

```ts
class ComputedRefImpl {
  private _getter: any

  private _value: any

  private _dirty = true

  private _effect: ReactiveEffect

  constructor(getter) {
    this._getter = getter

    // @tips:
    //  1.使用`effect`,响应式对象变更,会自己触发`getter`,那`_dirty`就没有意义了
    //  2.所以使用`shceduler`,自定义依赖收集之后的操作
    //  3.将`_dirty`设置为`true`,下次调用`get`的时候,就能拿到最新值了
    this._effect = new ReactiveEffect(getter, () => {
      this._dirty = true
    })
  }

  get value() {
    // @desc: 使用开关,避免冲重复调用`getter`,缓存返回值`_value`
    if (this._dirty) {
      this._dirty = false
      return (this._value = this._effect.run())
    }

    return this._value
  }
}

// 简版,应该也有setter才对
export function computed(getter) {
  return new ComputedRefImpl(getter)
}
```

### 1.5 总结

响应式系统简版的实现,是相对其他包来说,算是简单的, 我们通过模型, 还有 `get/set` 的方式触发 `track/trigger`,进行依赖收集和触发更新, 能很清晰的看懂这个模式, 不得不说简单易用很强, `computed` 的实现也是很有技巧的, 真的需要大家发挥自己的想象,可以去做更多有用的工具
