# [确保在只读数组中,普通数组方法不会触发依赖收集](https://github.com/vuejs/vue-next/issues/2493)

> 翻译:
>
> 对应 `issues:` #2493
>
> 问题版本: **3.0.2**
>
> 描述地址: [fix(reactivity): ensure readonly on plain arrays doesn't track array methods](https://github.com/vuejs/vue-next/issues/2493)

## 1.问题

```ts
import { readonly } from 'vue'
import { effect } from '@vue/reactivity'

export default {
  setup() {
    const readonlyState = readonly(['a', 'b', 'c'])

    effect(() => {
      //readonlyState[0] 不收集deps
      readonlyState.includes('a') //收集deps
    })
  }
}
```

问题点:

1. **读取** 通过数组方法和下标获取,行为应该一致
2. **只读** 不应该收集依赖,因为不会改变,避免性能浪费

## 2.问题原因

### 2.1 `readonly` 只具备读取,不具备设置,所以不存在依赖变化

在我们使用 `readonly` 的时候,将值作为了 **只读** , 之后我们只具备读取,而不具备设置的功能, 因为我们在 `proxy` 的 `set` 方法实现的时候,对只读属性,根本就没有赋值操作, 这里的源码可以去看看 `mini-vue/reactivity` 的实现,可以看看自己的笔记

**[mini-vue 之 reactivity](https://juejin.cn/post/7040806312552169485)**

### 2.2 只读数组,获取方法收集依赖,下标没收集依赖

只读数组通过下标和方法获取,产生了不一致的行为,方法获取的时候,进行了依赖收集,实际应该不需要

```ts
function createGetter(isReadonly = false, shallow = false) {
  return function get(target: Target, key: string | symbol, receiver: object) {
    // ...以上代码省略

    // 是否数组
    const targetIsArray = isArray(target)
    // 是否数组方法获取,是的话,返回重写的数组方法,在下面的代码中,太妙了
    // Reflect.get返回的是重写后的函数方法
    if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver)
    }

    const res = Reflect.get(target, key, receiver)

    return res
  }
}
```

```ts
const arrayInstrumentations: Record<string, Function> = {}
;(['includes', 'indexOf', 'lastIndexOf'] as const).forEach(key => {
  // 保留原有方法
  const method = Array.prototype[key] as any
  arrayInstrumentations[key] = function (this: unknown[], ...args: unknown[]) {
    const arr = toRaw(this)
    for (let i = 0, l = this.length; i < l; i++) {
      // 数组元素,全量触发依赖收集
      track(arr, TrackOpTypes.GET, i + '')
    }
    // we run the method using the original args first (which may be reactive)
    // 执行原来方法
    const res = method.apply(arr, args)
    if (res === -1 || res === false) {
      // if that didn't work, run it again using raw values.
      return method.apply(arr, args.map(toRaw))
    } else {
      return res
    }
  }
})
```

### 2.3 分析

1. 实际作为只读对象,我们不应该收集依赖,浪费内存空间,造成不必要的性能消耗, 只读对象没有 `set` 操作,所以也就不存在变化,触发更新的操作

2. 这里只读数组,应该保持下标获取和方法操作的一致性,都是不进行依赖收集,除非是 `shallowReadonly` ,深层行为还是看具体使用

## 3. 解决方案

1. 数组下标和方法获取,行为保持一致性,增加只读判定

   ```ts
   const targetIsArray = isArray(target)
   // 增加只读判定
   if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
     return Reflect.get(arrayInstrumentations, key, receiver)
   }
   ```

   解决`PR`的代码[baseHandlers.ts#L103](https://github.com/vuejs/vue-next/blob/3.2/packages/reactivity/src/baseHandlers.ts#L103)

## 4. 总结

这个问题不算很难,知道它的原理,很容易定位到问题所在,进行处理,不过这里又学到一招,

- 代理重写方法的操作,也是很秀

  [baseHandlers.ts#L47](https://github.com/vuejs/vue-next/blob/49dc2dd1e4a56d0d2ad28003240c99e99ef469e4/packages/reactivity/src/baseHandlers.ts#L47)
