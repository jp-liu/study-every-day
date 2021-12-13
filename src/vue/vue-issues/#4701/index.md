# DeepReadonly 针对 Ref 类型解析错误

> 对应 `issues` => **#4701**
>
> 问题版本: **3.2.19**
>
> 地址: [Generating declarations for readonly/shallowReadonly ref causes TS4058 error](https://github.com/vuejs/vue-next/issues/4701)

## 1.问题点

根据 `issues` 的描述可以知道的:

1. 仅当 `tsconfig.json` 中 `"declaration"` 编译选项设置为 `true` 的时候才会复现

2. 当我们使用 `reactivity` 响应式系统时, 使用 `readonly` 包装 `ref` 类型的时候会出现打包报错,复现代码如下

   ```ts
   import { ref, readonly } from 'vue'

   export function useCounter() {
     const count = ref(0)

     function increment() {
       count.value++
     }

     return {
       count: readonly(count),
       increment
     }
   }
   ```

   报错信息如下:

   ```bash
   error TS4058: Return type of exported function has or is using name 'RefSymbol' from external module "/workspace/vue-refsymbol-issue/node_modules/@vue/reactivity/dist/reactivity" but cannot be named.
   # 翻译: 错误 TS4058: 导出函数的返回类型已经或正在使用外部模块的名称 `RefSymbol` "/workspace/vue-RefSymbol-issue/node _ modules/@vue/reactive/dist/reactive"，但不能命名。
   # 也就是说,我们函数返回之中使用了 `RefSymbol` 类型,但是打包并不能为这个类型创建类型声明,因为他是一个 `symbol` 私有值
   ```

> **`TS`** 错误信息类目表格[TS 错误信息](https://www.tslang.cn/docs/handbook/error.html)

## 2.问题原因

通过以上信息,得知这个问题出现在类型推导错误, 与代码无关, 而且是在需要打包需要编译类型声明的时候出现, `declaration: false` 则不会出现问题

问题出现在 `RefSymbol`

![image](https://user-images.githubusercontent.com/90845831/145713911-dfe19aeb-47b8-4c03-8273-ec2ad13430ad.png)

还记得这个类型为什么添加么?

在 `issues: 1111` 中为了避免解包编译后 `Ref` 类型推导错误添加的,不能实现了 `value` 就是 `Ref` 类型, 这个属于类型修改后的并发问题

**issues: #1111** 的解读可以查阅 []()

既然是 `readonly` 返回类型推导错误, 那么去查阅 `readonly` 的返回值类型即可

```ts
/**
 * Creates a readonly copy of the original object. Note the returned copy is not
 * made reactive, but `readonly` can be called on an already reactive object.
 */
export declare function readonly<T extends object>(
  target: T
): DeepReadonly<UnwrapNestedRefs<T>>
// UnwrapNestedRefs 上期就解决的这个问题
```

```ts
type Primitive = string | number | boolean | bigint | symbol | undefined | null
type Builtin = Primitive | Function | Date | Error | RegExp

// DeepReadonly 类型定义
export type DeepReadonly<T> = T extends Builtin // 是否原生 `JS` 类型
  ? T
  : T extends Map<infer K, infer V> // `Map`
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends WeakMap<infer K, infer V> // WeakMap
  ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer U> // Set
  ? ReadonlySet<DeepReadonly<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends WeakSet<infer U> // WeakSet
  ? WeakSet<DeepReadonly<U>>
  : T extends Promise<infer U> // Promise
  ? Promise<DeepReadonly<U>>
  : T extends {}
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : Readonly<T>
```

问题复现(感谢 **[likui628](https://github.com/likui628)** 同学): [TS Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBACgTgSwLYOAgbtAvFAzsRAOwHMoAfKQgVyQCMI5ypaB7FgGwgENCnaFiCQsCa4QdDkyqEAJhABmQiDKbV27AFChIUAEJUE7NLxzxkqDNAoAxaQGM0LXhQAiXYFagBROHBaMKACUIYi8ADzANCAj-EW1oFwgIMGCuGSd2EAAeABUAPigcHKhoj1lcPQMjIQ0oKAB+KBzaqAAuJpKwspkKgG8AXxbG3qg4bnTCTKgAbQBpKCEoAGsIEBZ5JoBddsTk1InM3LnNgsG69v2M7PyNDTk7di4xqDsnfChg+QBlcVZ2dukCAAjlRoGIJJoojE4CIhB44PIuHZoJ9coUoDwQAVei10Fx2KD2s06tNPj8IdsoARQRpBhoAPQAKi04GgHneOBxdTGaSuUDxBIg7WodAYAG4WjyDiAZmTfhxKdSIBKzoz6SydOyRDhdilxlcsqiRfQ4Hk8kA)

```ts
// 简化代码,我们不需要这么复杂, Promise/Map/Set都不需要
type Primitive = string | number | boolean | bigint | symbol | undefined | null
type Builtin = Primitive | Function | Date | Error | RegExp
export type DeepReadonly<T> = T extends Builtin
  ? T
  : T extends {}
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : Readonly<T>

declare const RefSymbol: unique symbol

export interface Ref<T = any> {
  value: T
  [RefSymbol]: true
}

/*
type test = {
  readonly value: number;
  readonly [RefSymbol]: true;
}
 */
// Ref 接口是 extends {} 的,所以会将 `Ref` 的所有 `key` 进行递归处理,从而导致了内部私有属性 `[RefSymbol]` 的暴露
type test = DeepReadonly<Ref<number>>
```

## 3. 解决方案

问题锁定了, 那么如何解决呢?,如何不让内部私有属性是泄露呢, 这个时候我们需要让 `Readonly` 正确读取 `Ref` 类型就可以了, 一个正确的 `Ref<T>` 类型,而不是 `Ref` 内部的属性遍历 添加 `readonly` 的结果

[TS Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBACgTgSwLYOAgbtAvFAzsRAOwHMoAfKQgVyQCMI5ypaB7FgGwgENCnaFiCQsCa4QdDkyqEAJhABmQiDKbV27AFChIUAEJUE7NLxzxkqDNAoAxaQGM0LXhQAiXYFagBROHBaMKACUIYi8ADzANCAj-EW1oFwgIMGCuGSd2EAAeABUAPigcHKhoj1lcPQMjIQ0oKAB+KBzaqAAuJpKwspkKgG8AXxbG3qg4bnTCTKgAbQBpKCEoAGsIEBZ5JoBddsTk1InM3LnNgsG69v2M7PyNDTk7di4xqDsnfChg+QBlcVZ2dukCAAjlRoGIJJoojE4CIhB44PIuHZoJ9coUoDwQAVei10Fx2KD2s06tNPj8IdsoARQRpBhoAPQAKi04GgHneOBxdTGaSuUDxBIg7WodAYAG4WjyDiAZmTfhxKdSIBKzoz6SydOyRDhdilxlcsqiRfQ4Hk8kA)

```ts
type Primitive = string | number | boolean | bigint | symbol | undefined | null
type Builtin = Primitive | Function | Date | Error | RegExp
export type DeepReadonly<T> = T extends Builtin
  ? T
  : // 是否是 `Ref` 类型, 是的话,不需要推导 `Ref` 而应该是 `Ref` 的参数 `T`
  T extends Ref<infer R>
  ? Ref<DeepReadonly<R>>
  : T extends {}
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : Readonly<T>

declare const RefSymbol: unique symbol

export interface Ref<T = any> {
  value: T
  [RefSymbol]: true
}

// type test = Ref<number>
type test = DeepReadonly<Ref<number>>
```

类型测试

```ts
describe('readonly ref', () => {
  const r = readonly(ref({ count: 1 }))
  expectType<Ref<{ readonly count: number }>>(r)
})

describe('readonly ref', () => {
  const r = readonly(ref(0))
  expectType<Ref<number>>(r)
})
```

## 4.总结

这个 `issues` 上一个 **#1111** 的并发问题,他会导致 `TS` 编译 `.d.ts` 文件错误 => `TS错误查询表` => [TS 错误信息](https://www.tslang.cn/docs/handbook/error.html)

1. 这个 `issues` 属于类型体操的问题, 足可见得 类型体操 需要考虑的特别周全,需要多多练习
