## typeof

**`typeof`** 操作符返回一个字符串，表示未经计算的操作数的类型。

| 类型                                                                                                          | 结果                                                                                                           |
| :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------- |
| [Undefined](https://developer.mozilla.org/zh-CN/docs/Glossary/undefined)                                      | `"undefined"`                                                                                                  |
| [Null](https://developer.mozilla.org/zh-CN/docs/Glossary/Null)                                                | `"object"` (见[下文](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof#null)) |
| [Boolean](https://developer.mozilla.org/zh-CN/docs/Glossary/Boolean)                                          | `"boolean"`                                                                                                    |
| [Number](https://developer.mozilla.org/zh-CN/docs/Glossary/Number)                                            | `"number"`                                                                                                     |
| [BigInt](https://developer.mozilla.org/zh-CN/docs/Glossary/BigInt)(ECMAScript 2020 新增)                      | `"bigint"`                                                                                                     |
| [String](https://developer.mozilla.org/zh-CN/docs/Glossary/String)                                            | `"string"`                                                                                                     |
| [Symbol](https://developer.mozilla.org/zh-CN/docs/Glossary/Symbol) (ECMAScript 2015 新增)                     | `"symbol"`                                                                                                     |
| 宿主对象（由 JS 环境提供）                                                                                    | _取决于具体实现_                                                                                               |
| [Function](https://developer.mozilla.org/zh-CN/docs/Glossary/Function) 对象 (按照 ECMA-262 规范实现 [[Call]]) | `"function"`                                                                                                   |
| 其他任何对象                                                                                                  | `"object"`                                                                                                     |

```js
console.log(typeof '') // string
console.log(typeof 1) // number
console.log(typeof 1n) // bigint
console.log(typeof true) // boolean
console.log(typeof undefined) // undefined
console.log(typeof function () {}) // function

console.log(typeof null) // object
console.log(typeof []) // object
console.log(typeof {}) // object
```

可以看到，typeof 对于基本数据类型判断是没有问题的，但是遇到引用数据类型（如：Array）是不起作用的。

**typeof 能判断是否是函数**

```js
//typeof 能判断函数
typeof console.log(1) // function
typeof function fn() {} // function
```

**typeof 能判断出是否是引用类型（不可细分）**

```js
//typeof 判断引用类型
const a = null       typeof a // object
const a = { a: 100 } typeof a // object
const a = ['a']      typeof a // object
```

**typeof null**

```js
// JavaScript 诞生以来便如此
typeof null === 'object'
```

在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 `null` 代表的是空指针（大多数平台下值为 0x00），因此，null 的类型标签是 0，`typeof null` 也因此返回 `"object"`。

曾有一个 ECMAScript 的修复提案（通过选择性加入的方式），但[被拒绝了](http://wiki.ecmascript.org/doku.php?id=harmony:typeof_null)。该提案会导致 `typeof null === 'null'`。
