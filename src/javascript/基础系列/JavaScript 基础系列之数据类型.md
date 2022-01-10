## JavaScript 基础系列之数据类型

## 1.数据类型

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)最新规范标准介绍

最新的 ECMAScript 标准定义了 8 种数据类型:

- 7 种原始类型，使用 `typeof`

  运算符检查:

  - [undefined](https://developer.mozilla.org/zh-CN/docs/Glossary/undefined)：`typeof instance === "undefined"`
  - [Boolean](https://developer.mozilla.org/zh-CN/docs/Glossary/Boolean)：`typeof instance === "boolean"`
  - [Number](https://developer.mozilla.org/zh-CN/docs/Glossary/Number)：`typeof instance === "number"`
  - [String](https://developer.mozilla.org/zh-CN/docs/Glossary/String)：`typeof instance === "string`
  - [BigInt](https://developer.mozilla.org/zh-CN/docs/Glossary/BigInt)：`typeof instance === "bigint"`
  - [Symbol](https://developer.mozilla.org/zh-CN/docs/Glossary/Symbol) ：`typeof instance === "symbol"`
  - [null](https://developer.mozilla.org/zh-CN/docs/Glossary/Null)：`typeof instance === "object"`。

- [Object](https://developer.mozilla.org/zh-CN/docs/Glossary/Object)：`typeof instance === "object"`。任何 constructed 对象实例的特殊非数据结构类型，也用做数据结构：new [Object](https://developer.mozilla.org/zh-CN/docs/Glossary/Object)，new [Array](https://developer.mozilla.org/zh-CN/docs/Glossary/array)，new Map，new Set，new WeakMap，new WeakSet，new Date，和几乎所有通过 new keyword 创建的东西。

记住 `typeof` 操作符的唯一目的就是检查数据类型，如果我们希望检查任何从 Object 派生出来的结构类型，使用 `typeof` 是不起作用的，因为总是会得到 `"object"`。检查 Object 种类的合适方式是使用 instanceof 关键字。但即使这样也存在误差。

> typeof: 是一个一元运算法
>
> 备注: 数据类型的判定,在深入`JavaScript` 和专题的编写类型判断函数中再次巩固

## 2.原始值 (primitive values)

除 `Object` 以外的所有类型都是不可变的（值本身无法被改变）。例如，与 C 语言不同，JavaScript 中字符串是不可变的（译注：如，`JavaScript` 中对字符串的操作一定返回了一个新字符串，原始字符串并没有被改变）。我们称这些类型的值为 `原始值`。

原始值包括

1. [布尔类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#布尔类型) `boolean`

2. [Null 类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#null_类型) `null`

3. [Undefined 类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#undefined_类型) `undefined`

4. [数字类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#数字类型)在`js`中,只有一种数字类型,基于 `IEEE 754` 标准的双精度 64 位二进制格式的值（-(253 -1) 到 253 -1） `number`

5. [BigInt 类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#bigint_类型) `bigint`

6. [字符串类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#字符串类型) `string`

7. [符号类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#符号类型) `symbol`

其中 Symbol 和 BigInt 是 ES6 中新增的数据类型：

- [Symbol](https://developer.mozilla.org/zh-CN/docs/Glossary/Symbol) 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。
- [BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

[查看 MDN 介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%8E%9F%E5%A7%8B%E5%80%BC_primitive_values)

## 3.对象

在 JavaScript 里，对象可以被看作是一组属性的集合。

ECMAScript 定义的对象中有两种属性：数据属性和访问器属性。

#### 数据属性

数据属性是键值对，并且每个数据属性拥有下列特性:

| 特性             | 数据类型             | 描述                                                                                                                                             | 默认值    |
| :--------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :-------- |
| [[Value]]        | 任何 Javascript 类型 | 包含这个属性的数据值。                                                                                                                           | undefined |
| [[Writable]]     | Boolean              | 如果该值为 `false，`则该属性的 [[Value]] 特性 不能被改变。                                                                                       | false     |
| [[Enumerable]]   | Boolean              | 如果该值为 `true，`则该属性可以用 [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) 循环来枚举。 | false     |
| [[Configurable]] | Boolean              | 如果该值为 `false，`则该属性不能被删除，并且 除了 [[Value]] 和 [[Writable]] 以外的特性都不能被改变。                                             | false     |

#### 访问器属性

访问器属性有一个或两个访问器函数 (get 和 set) 来存取数值，并且有以下特性:

| 特性             | 类型                   | 描述                                                                                                                                             | 默认值    |
| :--------------- | :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :-------- |
| [[Get]]          | 函数对象或者 undefined | 该函数使用一个空的参数列表，能够在有权访问的情况下读取属性值。另见 `get。`                                                                       | undefined |
| [[Set]]          | 函数对象或者 undefined | 该函数有一个参数，用来写入属性值，另见 `set。`                                                                                                   | undefined |
| [[Enumerable]]   | Boolean                | 如果该值为 `true，则该属性可以用` [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) 循环来枚举。 | false     |
| [[Configurable]] | Boolean                | 如果该值为 `false，则该属性不能被删除，并且不能被转变成一个数据属性。`                                                                           | false     |

这些属性,都可以通过 `Object.defineProperty` 进行定义

```js
const object1 = {}

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false
})

object1.property1 = 77
// throws an error in strict mode

console.log(object1.property1)
// expected output: 42
```

需要注意的是,访问器属性和数据属性,是分开的, 设置访问器属性,就不能设置属性模式, 不然`get/set`,和`value`的值不确定返回那个了
