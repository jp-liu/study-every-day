# mini-vue

> 通过实现一个 `mini-vue3` 来加深自己对 `vue` 的理解,慢慢学习,记录自己所学
>
> 这个 `mini-vue3` 是通过 崔效瑞 的 git 仓库学习, **阮一峰老师** 推荐的学习 `vue3` 利器
>
> 本仓库地址: [mini-vue3]()
>
> 源码: [mini-vue](https://github.com/cuixiaorui/mini-vue)

**Vue3** 的依赖图模块

TODO 公司有些一份,拿过来用

## 1.响应式系统 `reactivity`

说道 `vue` 大家都知道 `vue` 的双向数据绑定,让我们能够基于 **MVVM** 模型, 通过 **声明式** 变成的方式,操作数据和页面

![mvvm3](D:\project\github\study-everyday\src\vue\mini-vue\images\mvvm3.png)

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

![effect](D:\project\github\study-everyday\src\vue\mini-vue\reactivity\img\effect.png)

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
