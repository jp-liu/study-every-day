# reactive 和 ref 的类型推导错误

> 对应 `issues` 号为: **#1111**
>
> 地址: [reactive and ref type infer is Wrong](https://github.com/vuejs/vue-next/issues/1111)

## 1. 问题描述

出现问题版本为: **3.0.0-beta7**

```ts
const state = reactive({
  foo: {
    value: 1,
    label: 'bar'
  }
})

// 推导类型为 `foo: number` 导致 `label` 问题错误
console.log(state.foo.label) // Property 'label' does not exist on type 'number'
```

## 2.问题原因

1. 查看一下 `reactive` 返回的是一个什么类型

   ```ts
   // 深层解包 `ref`
   type UnwrapNestedRefs<T> = T extends Ref ? T : UnwrapRef<T>

   // 返回解包后的类型
   export function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
   ```

2. 知道返回值的类型,查看一下,这个泛型方法 `UnwrapNestedRefs` 所做的事情, 如果是 `Ref` 类型,直接返回, 不是 `Ref` 则进行解包, 返回解包后的类型

   ```ts
   // Ref 接口需要满足两个属性
   // 	 __v_isRef: true
   //   value: T
   export interface Ref<T = any> {
     /**
      * @internal
      */
     __v_isRef: true
     value: T
   }
   // 这是我们编写的 `Ref` 类型, 正常对象都是没有 `__v_isRef` 属性的,只有通过 `ref` 函数创建的对象,才会拥有这个属性
   function createRef(rawValue: unknown, shallow = false) {
     if (isRef(rawValue)) {
       return rawValue
     }
     let value = shallow ? rawValue : convert(rawValue)
     const r = {
       // 提供 `Ref` 标识
       __v_isRef: true,
       get value() {
         //...
       },
       set value(newVal) {
         //...
     }
     return r
   }
   ```

3. 如果不是 `Ref` 将会执行 `UnwrapRef` 泛型函数,

   ```ts
   // 判断是不是 `ComputedRef`
   //   - 是: 进行解包,递归处理 `value` 的类型
   //   - 否: 判断是否 `Ref`
   //      - 是: 递归解包 `value`
   //      - 否: 普通对象的递归类型重组,如果是 `Ref` 继续这一套操作
   export type UnwrapRef<T> = T extends ComputedRef<infer V>
     ? UnwrapRefSimple<V>
     : T extends Ref<infer V>
     ? UnwrapRefSimple<V>
     : UnwrapRefSimple<T>

   // 将所有值类型转化解包,交叉原有对象的接口
   type UnwrappedObject<T> = {
     [P in keyof T]: UnwrapRef<T[P]>
   } & SymbolExtract<T>
   ```

4. 从上面可以看到, 正常的 `Ref` 会直接返回,没有什么错, 如果这个时候我们去追寻类型函数的解包的时候,也不会发现有什么问题,因为只是解包,还是一样判断是不是 `Ref` 类型, 这个时候,我们应该注意到 `Ref` 类型的 `JSDoc` 其中有个注释,特殊的存在,去官网查看之后才知道,这个标识的作用

   ![internal](https://pic.imgdb.cn/item/61b1eeb02ab3f51d91ec4594.jpg)

   翻译过来就是

   ```txt
   不要在JSDoc注释中包含@internal注释的代码发出声明。这是一个内部编译器选项；使用的风险由您自己承担，因为编译器不会检查结果是否有效。如果您正在搜索一个工具来处理d.ts文件中的其他可见性级别
   ```

   使用这个注释,会在编译后将对应标识去除,也就是会变成这样

   ```ts
   export interface Ref<T = any> {
     /**
      * @internal
      */
     // __v_isRef: true 编译干掉了
     value: T
   }

   // 这个时候我们就知道,只要实现了一个 `value` 属性,就会被认为是 `Ref` 对象,上面的问题也就会变成
   const state = reactive({
     foo: {
       value: 1,
       label: 'bar'
     }
   })

   // 判断是不是 `ComputedRef`
   //   - 是: 进行解包,递归处理 `value` 的类型
   //   - 否: 判断是否 `Ref`
   //      - 是: 递归解包 `value`
   //      - 否: 普通对象的递归类型重组,如果是 `Ref` 继续这一套操作
   // infer V 的含义
   // 1.infer V 就是推导 T 的类型
   // 2.value: T,也就是知道了 `value` 的类型,也就是 `T` 的类型
   export type UnwrapRef<T> = T extends ComputedRef<infer V>
     ? UnwrapRefSimple<V>
     : T extends Ref<infer V>
     ? UnwrapRefSimple<V>
     : UnwrapRefSimple<T>

   type UnwrapNestedRefs<T> = T extends Ref ? T : UnwrapRef<T>

   type UnwrappedObject<T> = {
     [P in keyof T]: UnwrapRef<T[P]>
   } & SymbolExtract<T>

   type UnwrapNestedRefs<T> = T extends Ref ? T : UnwrapRef<T>

   type obj = { foo: { value: number; label: string } }
   type res = UnwrapNestedRefs<obj>
   // 第一步判断是否是 `Ref`
   // => obj extends Ref ? obj : UnwrapRef<obj>
   // => obj extends ComputedRef ? UnwrapRefSimple<obj> : obj extends Ref ? UnwrapRefSimple<obj.value> : UnwrapRefSimple<obj> // 不是`computed` 没有实现 `effect` 接口
   // => obj extends Ref ? UnwrapRefSimple<obj.value> : UnwrapRefSimple<obj>

   // 第二步开始处理内部对象
   // => { [P in keyof T]: UnwrapRef<obj> } 遍历对象 `key`
   // => foo extends ComputedRef ? UnwrapRefSimple<foo> : foo extends Ref ? UnwrapRefSimple<foo.value> : UnwrapRefSimple<foo> // 不是`computed` 没有实现 `effect` 接口
   // => foo extends Ref => true
   // => foo: UnwrapRef<T[P]> => foo: foo.value => foo: number
   // 这样,就造成了类型的推导错误
   ```

## 3.解决方案

既然是 `__v_isRef` 标识错误, 那么我们初步想到的方案就是将 `@internal` 注释给它去掉啊~! 哈哈哈

显然这个方案,是不可行的,这样我们在 **IDE** 中输入 `Ref` 对象的时候,会自动提示 `value/__v_isRef` 提示,显然这个标识使我们框架内部使用, 外部不应该让他知道有这个接口属性

```ts
const RefSymbol = Symbol()

// 我们使用一个 `私有符号` 来代替 `__v_isRef`, 这样既可以达到唯一标识, IDE 也不会提示我们的 symbol 私有符号
export interface Ref<T = any> {
  /**
   * Type differentiator only.
   * We need this to be in public d.ts but don't want it to show up in IDE
   * autocomplete, so we use a private Symbol instead.
   */
  [RefSymbol]: true
  value: T
}

export function ref<T extends object>(
  value: T
): T extends Ref ? T : Ref<UnwrapRef<T>>
export function ref<T>(value: T): Ref<UnwrapRef<T>>
export function ref<T = any>(): Ref<T | undefined>
export function ref(value?: unknown) {
  return createRef(value)
}

function createRef(rawValue: unknown, shallow = false) {
  //...
  const r = {
    __v_isRef: true,
    get value() {
      //...
    },
    set value(newVal) {
      //...
    }
  }
  return r
}
```

## 4.总结

这个 `issues` 是比较有含量, 我们可以学习到的内容很多

1. **@internal** 内部标识符号,我们可以通过他,在编译后,让 IDE 无法获取到,而内部却实现了这个接口

2. 这个是一个巧妙的 `infer` 关键字的使用

   ```ts
   // T extends Ref<infer V>
   export interface Ref<T = any> {
     /**
      * @internal
      */
     value: T
   }
   // 如果实现了该接口, 必然泛型会进行匹配, value 的类型,会反应到 T 上,使得 Ref<infer V> V === T,得到了 `value` 的类型, 使得解包变得简单
   ```

3. **Symbol()** 私有符号在 `TS` 中的运用

4. 组合大于继承, 在 `vue3` 中我们可以发现 `尤大` 特别喜欢使用内部创建对象返回, 而不是创建类,进行封装, `createApp` 返回的 `app` 实例对象,就是一个对象, 创建代理对象,都是通过 `createReactiveObject` 返回对象, 今天的 `issues` 中的 `Ref`

   ```ts
   function createRef(rawValue: unknown, shallow = false) {
     //...
     const r = {
       __v_isRef: true,
       get value() {
         //...
       },
       set value(newVal) {
         //...
       }
     }
     return r
   }
   ```

5. 在最近写的 `mini-vue` 中, 以后一定也要加上自己的类型,还有和自己实现的 `RefImpl` 类作区分,进行实现

6. 还可以在扩展几个点, 周末的时候进行填充

   1. 类型测试
   2. API Extractor 的玩法
   3. vue3 build 的流程 比如如何生成 .d.ts
