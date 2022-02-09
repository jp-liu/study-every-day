# 类型转换之类型转换规则

## 前言

在 JavaScript 中，有一部分内容，情况复杂，容易出错，饱受争议但又应用广泛，这便是类型转换。

将值从一种类型转换为另一种类型通常称为类型转换。类型转换分为

- **强制类型转换: ** 我们通过代码强制转换成为对应的类型
- **隐式类型转换: ** JavaScript 在底层帮助我们将类型转换为一致, 进行运算的过程

在 JavaScript 中, 数据类型总结就是 `六基一引`, 六种基础数据类型, 一种引用数据类型, 具体可以查看 [JavaScript 基础系列之数据类型](../基础系列/JavaScript基础系列之数据类型.md) 这里简单列一下

- 基础类型(原始值)
  1. **String**
  2. **Number**
  3. **Boolean**
  4. **Undefined**
  5. **Null**
  6. **BigInt**
- 引用类型
  1. **Object**

下面我们先来看看类型之间的转换规则吧。

## 1.原始值转布尔

我们使用 Boolean 函数将类型转换成布尔类型，在 JavaScript 中，只有 6 种值可以被转换成 false，其他都会被转换成 true。

```js
console.log(Boolean()) // false

console.log(Boolean(false)) // false
console.log(Boolean(undefined)) // false
console.log(Boolean(null)) // false
console.log(Boolean(+0)) // false
console.log(Boolean(-0)) // false
console.log(Boolean(0n)) // false 注意这里就不能加 + 号, 会被认为一元运算符,转化成为number类型,报错
console.log(Boolean(-0n)) // false
console.log(Boolean(NaN)) // false
console.log(Boolean('')) // false
```

注意，当 Boolean 函数不传任何参数时，会返回 false。

## 2.原始值转数字

我们可以使用 Number 函数将类型转换成数字类型，如果参数无法被转换为数字，则返回 NaN。

> NaN 是一个的数字, 只是不确定是多少

在看例子之前，我们先看 [ES5 规范 15.7.1.1](http://es5.github.io/#x15.7.1.1) 中关于 Number 的介绍：

![ToNumber](D:\project\github\study-everyday\src\assets\image\深入系列\ToNumber.png)

根据规范，如果 Number 函数不传参数，返回 +0，如果有参数，调用 `ToNumber(value)`。

注意这个 `ToNumber` 表示的是一个底层规范实现上的方法，并没有直接暴露出来。

而 `ToNumber` 则直接给了一个[对应的结果表](http://es5.github.io/#x9.3)。表如下：

| 参数类型  | 结果                                           |
| --------- | ---------------------------------------------- |
| Undefined | NaN                                            |
| Null      | +0                                             |
| Boolean   | 如果参数是 true，返回 1。参数为 false，返回 +0 |
| Number    | 返回与之相等的值                               |
| String    | 这段比较复杂，看例子                           |

让我们写几个例子验证一下：

```js
console.log(Number()) // +0

console.log(Number(undefined)) // NaN
console.log(Number(null)) // +0

console.log(Number(false)) // +0
console.log(Number(true)) // 1

console.log(Number('123')) // 123
console.log(Number('-123')) // -123
console.log(Number('1.2')) // 1.2
console.log(Number('000123')) // 123
console.log(Number('-000123')) // -123

console.log(Number('0x11')) // 17

console.log(Number('')) // 0
console.log(Number(' ')) // 0

console.log(Number('123 123')) // NaN
console.log(Number('foo')) // NaN
console.log(Number('100a')) // NaN
```

如果通过 Number 转换函数传入一个字符串，它会试图将其转换成一个整数或浮点数，而且会忽略所有前导的 0，如果有一个字符不是数字，结果都会返回 NaN，鉴于这种严格的判断，我们一般还会使用更加灵活的 parseInt 和 parseFloat 进行转换。

parseInt 只解析整数，parseFloat 则可以解析整数和浮点数，如果字符串前缀是 "0x" 或者"0X"，parseInt 将其解释为十六进制数，parseInt 和 parseFloat 都会跳过任意数量的前导空格，尽可能解析更多数值字符，并忽略后面的内容。如果第一个非空格字符是非法的数字直接量，将最终返回 NaN：

```js
console.log(parseInt('3 abc')) // 3
console.log(parseFloat('3.14 abc')) // 3.14
console.log(parseInt('-12.34')) // -12
console.log(parseInt('0xFF')) // 255
console.log(parseFloat('.1')) // 0.1
console.log(parseInt('0.1')) // 0
```

## 3.原始值转字符

我们使用 `String` 函数将类型转换成字符串类型，依然先看 [规范 15.5.1.1](http://es5.github.io/#x15.5.1.1)中有关 `String` 函数的介绍：

![ToString](D:\project\github\study-everyday\src\assets\image\深入系列\ToString.png)

如果 `String` 函数不传参数，返回空字符串，如果有参数，调用 `ToString(value)`，而 `ToString` 也给了一个对应的结果表。表如下：

| 参数类型  | 结果                                                     |
| --------- | -------------------------------------------------------- |
| Undefined | "undefined"                                              |
| Null      | "null"                                                   |
| Boolean   | 如果参数是 true，返回 "true"。参数为 false，返回 "false" |
| Number    | 又是比较复杂，可以看例子                                 |
| String    | 返回与之相等的值                                         |

让我们写几个例子验证一下：

```js
console.log(String()) // 空字符串

console.log(String(undefined)) // undefined
console.log(String(null)) // null

console.log(String(false)) // false
console.log(String(true)) // true

console.log(String(0)) // 0
console.log(String(-0)) // 0
console.log(String(NaN)) // NaN
console.log(String(Infinity)) // Infinity
console.log(String(-Infinity)) // -Infinity
console.log(String(1)) // 1
```

注意这里的 `ToString` 和上一节的 `ToNumber` 都是底层规范实现的方法，并没有直接暴露出来。

## 4.原始值转对象

原始值到对象的转换非常简单，原始值通过调用 String()、Number() 或者 Boolean() 构造函数或者 Object()，会转换为它们各自的包装对象。

> 包装对象: 在存取对字符串，数字，布尔值的属性时临时创建的对象叫包装对象。
>
> 我们平常使用 字符串, 数字,都是原始值, 但是我们能够使用方法操作他们, 是因为在调用的时候,创建一个对象, 临时调用之后,再删掉。

null 和 undefined 属于例外，当将它们用在期望是一个对象的地方都会造成一个类型错误 (TypeError) 异常，而不会执行正常的转换。

```js
var a = 1
console.log(typeof a) // number
var b = new Number(a)
console.log(typeof b) // object
```

## 5.对象转布尔值

对象到布尔值的转换非常简单：所有对象(包括数组和函数)都转换为 true。对于包装对象也是这样，举个例子：

```js
console.log(Boolean(new Boolean(false))) // true
```

## 6.对象转字符串和数字

对于对象转字符串和数字, 我们需要先了解, 不管是对象到字符串, 还是对象到数字的转换, 都是通过调用 **待转换对象**的一个方法来完成的。

在 JavaScript 对象有两个不同的方法来执行转换，一个是 `toString`，一个是 `valueOf`。注意这个跟上面所说的 `ToString` 和 `ToNumber` 是不同的，这两个方法是真实暴露出来的方法。

所有的对象除了 null 和 undefined 之外的任何值都具有 `toString` 方法，通常情况下，它和使用 String 方法返回的结果一致。`toString` 方法的作用在于返回一个反映这个对象的字符串，然而这才是情况复杂的开始。

在[《JavaScript 专题之类型判断(上)》](https://github.com/mqyqingfeng/Blog/issues/28)中讲到过 Object.prototype.toString 方法会根据这个对象的[[class]]内部属性，返回由 "[object " 和 class 和 "]" 三个部分组成的字符串。举个例子：

```js
Object.prototype.toString
  .call({ a: 1 })(
    // "[object Object]"
    { a: 1 }
  )
  .toString()(
  // "[object Object]"
  { a: 1 }
).toString === Object.prototype.toString // true
```

我们可以看出当调用对象的 toString 方法时，其实调用的是 Object.prototype 上的 toString 方法。

然而 JavaScript 下的很多类根据各自的特点，定义了更多版本的 toString 方法。例如:

1. 数组的 toString 方法将每个数组元素转换成一个字符串，并在元素之间添加逗号后合并成结果字符串。
2. 函数的 toString 方法返回源代码字符串。
3. 日期的 toString 方法返回一个可读的日期和时间字符串。
4. RegExp 的 toString 方法返回一个表示正则表达式直接量的字符串。

读文字太抽象？我们直接写例子：

```js
console.log({}.toString()) // [object Object]

console.log([].toString()) // ""
console.log([0].toString()) // 0
console.log([1, 2, 3].toString()) // 1,2,3
console.log(
  function () {
    var a = 1
  }.toString()
) // function (){var a = 1;}
console.log(/\d+/g.toString()) // /\d+/g
console.log(new Date(2010, 0, 1).toString()) // Fri Jan 01 2010 00:00:00 GMT+0800 (CST)
```

而另一个转换对象的函数是 valueOf，表示对象的原始值。默认的 valueOf 方法返回这个对象本身，数组、函数、正则简单的继承了这个默认方法，也会返回对象本身。日期是一个例外，它会返回它的一个内容表示: 1970 年 1 月 1 日以来的毫秒数。

```js
var date = new Date(2017, 4, 21)
console.log(date.valueOf()) // 1495296000000
```

### 6.1 对象接着转字符串和数字

了解了 toString 方法和 valueOf 方法，我们分析下从对象到字符串是如何转换的。看规范 [ES5 9.8](http://es5.github.io/#x9.8)，其实就是 ToString 方法的对应表，只是这次我们加上 Object 的转换规则：

| 参数类型 | 结果                                                                   |
| -------- | ---------------------------------------------------------------------- |
| Object   | 1. primValue = ToPrimitive(input, String) 2. 返回 ToString(primValue). |

所谓的 ToPrimitive 方法，其实就是输入一个值，然后返回一个一定是基本类型的值。

我们总结一下，当我们用 String 方法转化一个值的时候，如果是基本类型，就参照 “原始值转字符” 这一节的对应表，如果不是基本类型，我们会将调用一个 ToPrimitive 方法，将其转为基本类型，然后再参照“原始值转字符” 这一节的对应表进行转换。

其实，从对象到数字的转换也是一样：

| 参数类型 | 结果                                                                    |
| -------- | ----------------------------------------------------------------------- |
| Object   | 1. primValue = ToPrimitive(input, Number) 2. 返回 ToNumber(primValue)。 |

虽然转换成基本值都会使用 ToPrimitive 方法，但传参有不同，最后的处理也有不同，转字符串调用的是 `ToString`，转数字调用 `ToNumber`。

### 6.2 ToPrimitive

那接下来就要看看 ToPrimitive 了，在了解了 toString 和 valueOf 方法后，这个也很简单。

让我们看规范 9.1，函数语法表示如下：

```js
ToPrimitive(input, [PreferredType])
```

第一个参数是 input，表示要处理的输入值。

第二个参数是 PreferredType，非必填，表示希望转换成的类型，有两个值可以选，Number 或者 String。

当不传入 PreferredType 时，如果 input 是日期类型，相当于传入 String，否则，都相当于传入 Number。

如果传入的 input 是 Undefined、Null、Boolean、Number、String 类型（原始值），直接返回该值。

如果是 ToPromitive(obj, Number)，处理步骤如下：

1. 如果 obj 为基本类型，直接返回。
2. 否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。
3. 否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回。
4. 否则，JavaScript 抛出一个类型错误异常。

如果是 ToPrimitive(obj, String)，处理步骤如下：

1. 如果 obj 为 基本类型，直接返回。
2. 否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回。
3. 否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。
4. 否则，JavaScript 抛出一个类型错误异常。

### 6.3 对象转字符串

所以总结下，对象转字符串(就是 String() 函数)可以概括为：

1. 如果对象具有 toString 方法，则调用这个方法。如果他返回一个原始值，JavaScript 将这个值转换为字符串，并返回这个字符串结果。
2. 如果对象没有 toString 方法，或者这个方法并不返回一个原始值，那么 JavaScript 会调用 valueOf 方法。如果存在这个方法，则 JavaScript 调用它。如果返回值是原始值，JavaScript 将这个值转换为字符串，并返回这个字符串的结果。
3. 否则，JavaScript 无法从 toString 或者 valueOf 获得一个原始值，这时它将抛出一个类型错误异常。

### 6.4 对象转数字

对象转数字的过程中，JavaScript 做了同样的事情，只是它会首先尝试 valueOf 方法

1. 如果对象具有 valueOf 方法，且返回一个原始值，则 JavaScript 将这个原始值转换为数字并返回这个数字
2. 否则，如果对象具有 toString 方法，且返回一个原始值，则 JavaScript 将其转换并返回。
3. 否则，JavaScript 抛出一个类型错误异常。

举个例子：

```js
console.log(Number({})) // NaN
console.log(Number({ a: 1 })) // NaN

console.log(Number([])) // 0
console.log(Number([0])) // 0
console.log(Number([1, 2, 3])) // NaN
console.log(
  Number(function () {
    var a = 1
  })
) // NaN
console.log(Number(/\d+/g)) // NaN
console.log(Number(new Date(2010, 0, 1))) // 1262275200000
console.log(Number(new Error('a'))) // NaN
```

注意，在这个例子中，`[]` 和 `[0]` 都返回了 0，而 `[1, 2, 3]` 却返回了一个 NaN。我们分析一下原因：

当我们 `Number([])` 的时候，先调用 `[]` 的 `valueOf` 方法，此时返回 `[]`，因为返回了一个对象而不是原始值，所以又调用了 `toString` 方法，此时返回一个空字符串，接下来调用 `ToNumber` 这个规范上的方法，参照对应表，转换为 `0`, 所以最后的结果为 `0`。

而当我们 `Number([1, 2, 3])` 的时候，先调用 `[1, 2, 3]` 的 `valueOf` 方法，此时返回 `[1, 2, 3]`，再调用 `toString` 方法，此时返回 `1,2,3`，接下来调用 `ToNumber`，参照对应表，因为无法转换为数字，所以最后的结果为 `NaN`。

### 6.5 JSON.stringify

值得一提的是：JSON.stringify() 方法可以将一个 JavaScript 值转换为一个 JSON 字符串，实现上也是调用了 toString 方法，也算是一种类型转换的方法。下面讲一讲 JSON.stringify 的注意要点：

1.处理基本类型时，与使用 toString 基本相同，结果都是字符串，除了 undefined

```js
console.log(JSON.stringify(null)) // null
console.log(JSON.stringify(undefined)) // undefined，注意这个undefined不是字符串的undefined
console.log(JSON.stringify(true)) // true
console.log(JSON.stringify(42)) // 42
console.log(JSON.stringify('42')) // "42"
```

2.布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。

```js
JSON.stringify([new Number(1), new String('false'), new Boolean(false)]) // "[1,"false",false]"
```

3.undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。

```js
JSON.stringify({ x: undefined, y: Object, z: Symbol('') })
// "{}"

JSON.stringify([undefined, Object, Symbol('')])
// "[null,null,null]"
```

4.JSON.stringify 有第二个参数 replacer，它可以是数组或者函数，用来指定对象序列化过程中哪些属性应该被处理，哪些应该被排除。

```js
function replacer(key, value) {
  if (typeof value === 'string') {
    return undefined
  }
  return value
}

var foo = {
  foundation: 'Mozilla',
  model: 'box',
  week: 45,
  transport: 'car',
  month: 7
}
var jsonString = JSON.stringify(foo, replacer)

console.log(jsonString)
// {"week":45,"month":7}
var foo = {
  foundation: 'Mozilla',
  model: 'box',
  week: 45,
  transport: 'car',
  month: 7
}
console.log(JSON.stringify(foo, ['week', 'month']))
// {"week":45,"month":7}
```

5.如果一个被序列化的对象拥有 toJSON 方法，那么该 toJSON 方法就会覆盖该对象默认的序列化行为：不是那个对象被序列化，而是调用 toJSON 方法后的返回值会被序列化，例如：

```js
var obj = {
  foo: 'foo',
  toJSON: function () {
    return 'bar'
  }
}
JSON.stringify(obj) // '"bar"'
JSON.stringify({ x: obj }) // '{"x":"bar"}'
```
