# JS 原始值转换的抽象操作 toPrimitive

> **`Symbol.toPrimitive` **是一个内置的 Symbol 值，它是作为对象的函数值属性存在的，当一个对象转换为对应的原始值时，会调用此函数。
>
> **原始值:** [JavaScript 基础系列之原始值和引用值](./src/javascript/基础系列/JavaScript 基础系列之原始值和引用值.md)

`Symbol.toPrimitive` 调用的时候,会传递一个字符串参数 `hint` ,表示要转换到的原始值的预期类型。 `hint` 参数的取值是 `"number"`、`"string"` 和 `"default"` 中的任意一个。

`toPrimitive` 的转换规则:

**如果传入参数是`string`，也就是对象到字符串的转换**，经过了如下步骤：

- 如果对象中有`toString()`方法，则调用这个方法。如果它返回一个原始值`(undefined、Boolean、Number、String、BigInt、Symbol 和 null)`，js 将这个值转换为字符串(如果本身不是字符串的话)，并返回这个字符串结果。
- 如果对象没有`toString()`方法，或者`toString()`没有返回一个原始值，那么 js 会调用`valueOf()`方法。如果返回值是原始值，js 将这个值转换为字符串，并返回字符串结果。
- 否则，js 抛出一个类型错误异常。

**如果传入参数是`number/default`，也就是对象到数字的转换**，经过了如下步骤：

和上面有点不同，到数字的转换会先尝试使用`valueOf()`方法

- 如果对象具有`valueOf()`方法，后者返回一个原始值，则 js 会将其转换为数字(如果需要的话)并返回这个数字。
- 否则，如果对象具有`toString()`方法，返回一个原始值(字符串直接量)，则 js 将其转换为数字类型，并返回这个数字。
- 否则，js 抛出一个类型错误异常。

注意：**对于所有非日期对象来说，对象到原始值的转换基本上是对象到数字的转换**

**类型转换的示例**

```js
// 一个没有提供 Symbol.toPrimitive 属性的对象，参与运算时的输出结果
var obj1 = {}
console.log(+obj1) // NaN
console.log(`${obj1}`) // "[object Object]"
console.log(obj1 + '') // "[object Object]"

// 接下面声明一个对象，手动赋予了 Symbol.toPrimitive 属性，再来查看输出结果
var obj2 = {
  [Symbol.toPrimitive](hint) {
    if (hint == 'number') {
      return 10
    }
    if (hint == 'string') {
      return 'hello'
    }
    return true
  }
}
console.log(Number(obj2)) // 10      -- hint 参数值是 "number"
console.log(String(obj2)) // "hello" -- hint 参数值是 "string"
console.log(obj2 + '') // "true"  -- hint 参数值是 "default"
```

# 日期对象的特殊情况

日期对象在原型里自定义了 toString()，即`Date.prototype.toString()`。

```js
1 var date = new Date();
2 date.toString(); // => "Mon Dec 28 2015 21:58:10 GMT+0800 (中国标准时间)"
```

`Date` 对象覆盖了从 `Object` 继承来的`Object.prototype.toString()` 方法。`Date` 的`toString()` 方法总是返回一个美式英语日期格式的字符串。当一个日期对象被用来作为文本值或用来进行字符串连接时，`toString() `方法会被自动调用。

"+" 和 "==" 应用的对象到原始值的转换包含**日期对象**的**一种特殊情形**。

日期类是 `JavaScript` 语言核心中唯一的预先定义类型，它定义了有意义的向字符串和数字类型的转换。

对于所有非日期的对象来说， 对象到原始值的转换基本上是对象到数字的转换（首先调用`valueOf()` , 日期对象则使用对象到字符串的转换模式，然而，这里的转换和上文讲述的井不完全一致：通过 `valueOf` 或 `toString` 返回的原始值将被直接使用，而不会被强制转换为数字或字符串。

和"==" 一样， ＂＜” 运算符以及其他关系运算符也会做对象到原始值的转换， 但要除去日期对象的特殊情形：任何对象都会首先尝试调用 `valueOf()` , 然后调用 `toString()` 。不管得到的原始值是否直接使用，它都不会进一步被转换为数字或字符串。

"+"、 "=="、 "!=" 和关系运算符是唯一执行这种特殊的字符串到原始值的转换方式的运算符。 其他运算符到特定类型的转换都很明确，而且对日期对象来讲也没有特殊情况。 例如 " -" (减号）运算符把它的两个操作数都转换为数字。

下面的代码示例：

```js
var now = new Date();    // 当前时间
typeof (now + 1);        // "string"
typeof (now - 1)；       // "number"
now == now. toString()； // true
now > (now -1)；         // true
var now1 = new Date();
// 拼串,调用了`toString`
now1 + 1 // 'Fri Oct 01 2021 10:58:55 GMT+0800 (中国标准时间)1'
// 减法运算
now1 - 1 // 1633057135763
```

# 字符串连接符与算术隐式转换规则混淆

```js
// 调用`valueOf`,true => 1
console.log(1 + true) // 2

// String(1) => '1'
console.log(1 + 'true') // "1true"

// undefined 就是原始值,无法运算直接得到 NaN
console.log(1 + undefined) // NaN

// 调用`valueOf`,null => 0
console.log(1 + null) // 1
```

`+`两边有一边是字符串，那这个`+`就是字符串连接符，它会把其他数据类型调用`String()`方法转成字符串然后拼接；

`+`做为算术运算符会把其他数据类型调用`Number()`转成数字然后做加法运算

布尔值`true`会被转换数字 `1`

`undefined`会被转换为 `NaN`

`null` 会转换为数字 `0`

# 实例详解

```js
// 大坑
console.log([] == 0) // true
console.log(![] == 0) // true
// 神坑
console.log([] == ![]) // true
console.log([] == []) // false
// 史诗级坑
console.log({} == !{}) // false
console.log({} == {}) // false
```

**`[]` 与 `0`比较：**

1. `[].valueOf().toString()` 得到空字符串
2. `Number("") == 0` 成立

**`![]` 与 `0`比较：**

    1. 逻辑非优先级高于关系运算符 `![] = false` (空数组转布尔得到true，然后取反得到false)

2. `false == 0` 成立

**`[]` 与 `![]`比较：**

（1） `[].valueOf().toString()` 得到空字符串 ""

（2） `![] = false`

（3） `Number("") == Number(false)` 成立 都是 0

**`[]` 与 `[]`比较：**

引用类型数据存在堆内存中，栈内存中存储的是地址，所以他们的结果是 false

**`{}` 与 `!{}`比较：**

（1） `{}.valueOf().toString()` 得到字符串`'[object Object]'`

（2） `!{} = false`

（3） `Number('[object Object]') == Number(false)` 不成立，因为转换到最后 是`NaN` 和 `0`比较，所以结果为 `false`

**`{}` 与 `{}`比较：**

引用类型数据存在堆内存中，栈内存中存储的是地址，所以他们的结果是 false

```js
{
}
;+[](
  // 0
  /**
   * 被认为成两行代码
   * {}
   * +[]
   */

  {}
) + []
/**
 * 如果两端都是对象,则会转换成数字,调用`valueOf`方法
 * ({}).valueOf() => ({}).toString() => '[object Object]'
 * [].valueOf() => [].toString() => ''
 * '[object Object]' + ''
 */
```

空对象加空数组就不一样了，加号运算符的定义是这样的：**如果其中一个是字符串，另一个也会被转换为字符串，否则两个运算数都被转换为数字。** 而同时，`javascript` 有这样的特性，**如果{}既可以被认为是代码块，又可以被认为是对象字面量，那么 js 会把他当做代码块来看待。**
