## readonly 标识丢失

> 对应 `issues` 号为: **#4986**
>
> 地址: [readonly() breaks comparison between objects](https://github.com/vuejs/vue-next/issues/4986)

### 1.问题

```ts
class Type {
  constructor(code) {
    this.code = code
  }

  getCode() {
    return this.code
  }
}

let simpler = readonly({ a: new Type(0), b: new Type(1) })
let moreComplex = reactive({ a: simpler.a, b: simpler.b })
console.log(`Before: ${moreComplex.a === simpler.a}`)
moreComplex.a = simpler.b
moreComplex.a = simpler.a
console.log(`After: ${moreComplex.a === simpler.a}`)
```

这是为什么呢,通过反复赋值,就不相等了?
解析:

1. `reactive/readonly` 通过 `Proxy` 将对象进行代理,设置`get/set` 来实现响应式系统,既然我们的值都是通过`get`返回的,那么问题肯定出现在 `get` 函数上,返回的值不一致
2. 为什么会出现不一致呢? 可操作性对象和只读对象,在 `vue3` 响应式系统中是通过闭包提供的 `isReadonly` 来识别
3. 出现了不一致,肯定是 `isReadonly` 标识导致,接下来看看代码

#### 1.1`isReadonly`

- **readonly** 将递归将所有对象属性设置为只读,也就是不能更改,没有`set`操作,并且提供`isReadonly=true`标识

  ```ts
  export function readonly<T extends object>(
    target: T
  ): DeepReadonly<UnwrapNestedRefs<T>> {
    return createReactiveObject(
      target,
      true, // 只读标识
      readonlyHandlers,
      readonlyCollectionHandlers,
      readonlyMap
    )
  }
  ```

- **reactive** 将全部设置响应式对象,提供 `isReadonly=false` 标识
  ```ts
  export function reactive(target: object) {
    // if trying to observe a readonly proxy, return the readonly version.
    if (target && (target as Target)[ReactiveFlags.IS_READONLY]) {
      return target
    }
    return createReactiveObject(
      target,
      false, // 可操作性标识
      mutableHandlers,
      mutableCollectionHandlers,
      reactiveMap
    )
  }
  ```

一个对象拥有 `isReadonly=true` 的标识,标识不可操作和变更,而在 `reactive` 对象的 `set` 中,有一个操作,却改变了这个行为

```ts
function createSetter(shallow = false) {
  return function set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ): boolean {
    /**
     * 在`set`函数中,只要响应式对象没有设置`shallow`标识(浅层),则会获取元值,用于比较,判断内部是否变更
     *
     * 判断点
     *   - 第一个判断指定`shallow`浅层的话,不需要原值,直接比较两个值,还有一种情况
     *   - 第二个判断,如果对象值是 `readonly` 则不需要取出原值比较,因为不可能改变,`set`都没有,应该保持现状,不能动
     * 所以少了第二个判断点
     */
    let oldValue = (target as any)[key]
    if (!shallow) {
      // 这里出问题了,不应该取`readonly`对象的原值,导致它失去了只读,然后又因为是对象,所以,在访问的时候,会被重新 `reactive` 代理成为响应式对象,就可以变更了
      value = toRaw(value)
      oldValue = toRaw(oldValue)
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value
        return true
      }
    }
    // ...
  }
}
```

#### 1.2 在看问题

```ts
const { readonly, reactive } = Vue
class Type {
  code
  constructor(code) {
    this.code = code
  }

  getCode() {
    return this.code
  }
}

let simpler = readonly({ onlyTypeA: new Type(0), onlyTypeB: new Type(1) })
let moreComplex = reactive({
  mutableA: simpler.onlyTypeA,
  mutableB: simpler.onlyTypeB
})

// 当前都是`readonly`对象
//    -`reactive` 的 `get` 返回值 if (target && (target as Target)[ReactiveFlags.IS_READONLY]) { return target }
//    -`readonly` 的 `get` 返回值 if (target[ReactiveFlags.RAW] && !(isReadonly && target[ReactiveFlags.IS_REACTIVE])) { return target }
// 可见都是一样的,`readonly`的时候,都是返回当前 `proxy` 对象
console.log(`Before: ${moreComplex.mutableA === simpler.onlyTypeA}`)

// 调用`set`的时候,没有判断新值是不是只读对象,直接进行`toRaw`处理,取得了元对象
// 然后会取出`onlyTypeB`,进行处理,丢失了`ReactiveFlags.IS_READONLY`
// 导致后续`get`的值两个不相等
moreComplex.mutableA = simpler.onlyTypeB
moreComplex.mutableA = simpler.onlyTypeA // 和上面一样的原因
console.log(`After: ${moreComplex.mutableA === simpler.onlyTypeA}`)
```

### 2.修改源码

```ts
function createSetter(shallow = false) {
  return function set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ): boolean {
    let oldValue = (target as any)[key]
    // 增加一个判断,不是`readonly`才进行进入
    if (!shallow && !isReadonly(value)) {
      // 如果不是readonly对象，参数value通过toRaw重设为原始对象
      value = toRaw(value)
      oldValue = toRaw(oldValue)
    }
    // 如果是readonly对象，参数value保持不变
    const result = Reflect.set(target, key, value, receiver)
    return result
  }
}
```
