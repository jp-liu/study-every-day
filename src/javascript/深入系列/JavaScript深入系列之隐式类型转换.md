# 类型转换之隐式类型转换

## 前言

在 [JavaScript 深入系列之类型转换规则](./src/javascript/深入系列/JavaScript深入系列之类型转换规则.md) 中, 我们知道了不同类型之间的转换规则, 也说了类型转换分为 **强制类型转换** 和 **隐式类型转换**, 其实强制类型转换, 在上一篇中已经说了, 就是通过 `String()`, `Number()`, `Boolean()`, `Object()` 这几个方法, 强制将我们提供的值, 转化成为对应的类型, 但是隐式转换, 我们并没有了解, 这篇笔记就是记录隐式转换的一些门道

比如说这个栗子:

```js
console.log(1 + '1')
```

其实大家都知道结果是 `'11'` ,是个字符串, 但是为什么会这样呢 ? 两种类型怎么计算的 ?

这是因为 JavaScript 自动的将数据类型进行了转换, 然后进行运算, 这就是 **隐式类型转换**

同时我们也知道都知道，`+`运算符既可以用于数字加法，也能用于字符串拼接，那在这个例子中，是将数字 `1` 转成字符串 `'1'`，进行拼接运算？还是将字符串 `'1'` 转成数字 `1`，进行加法运算呢？为什么？来看下吧

## 一元操作符 +

```js
console.log(+'1')
```

当 + 运算符作为一元操作符的时候，查看 [ES5 规范 1.4.6](http://es5.github.io/#x11.4.6)，会调用 `ToNumber` 处理该值，相当于 `Number('1')`，最终结果返回数字 `1`。

那么下面的这些结果呢？

```js
console.log(+[])
console.log(+['1'])
console.log(+['1', '2', '3'])
console.log(+{})
```

既然是调用 `ToNumber` 方法，回想 [JavaScript 深入系列之类型转换规则](./src/javascript/深入系列/JavaScript深入系列之类型转换规则.md) 中的内容，当输入的值是对象的时候，先调用 `ToPrimitive(input, Number)` 方法，执行的步骤是：

1. 如果 `obj` 为基本类型，直接返回
2. 否则，调用 `valueOf` 方法，如果返回一个原始值，则 `JavaScript` 将其返回。
3. 否则，调用 `toString` 方法，如果返回一个原始值，则`JavaScript` 将其返回。
4. 否则，`JavaScript` 抛出一个类型错误异常。

以 `+[]` 为例，`[]` 调用 `valueOf` 方法，返回一个空数组，因为不是原始值，调用 `toString` 方法，返回 `""`。

得到返回值后，然后再调用 `ToNumber` 方法，`""` 对应的返回值是 `0`，所以最终返回 `0`。

剩下的例子以此类推。结果是：

```js
console.log(+['1']) // 1
console.log(+['1', '2', '3']) // NaN
console.log(+{}) // NaN
```

## 二元操作符 +

### 规范

现在 `+` 运算符又变成了二元操作符，毕竟它也是加减乘除中的加号

`1 + '1'` 我们知道答案是 '11'，那 `null + 1`、`[] + []`、`[] + {}`、`{} + {}` 呢？

如果要了解这些运算的结果，不可避免的我们要从规范下手。

规范地址：http://es5.github.io/#x11.6.1

不过这次就不直接大段大段的引用规范了，直接给大家讲简化后的内容。

到底当执行 `+` 运算的时候，会执行怎样的步骤呢？让我们根据规范`11.6.1` 来捋一捋：

当计算 value1 + value2 时：

1. lprim = ToPrimitive(value1)
2. rprim = ToPrimitive(value2)
3. 如果 lprim 是字符串或者 rprim 是字符串，那么返回 ToString(lprim) 和 ToString(rprim)的拼接结果
4. 返回 ToNumber(lprim) 和 ToNumber(rprim)的运算结果

规范的内容就这样结束了。没有什么新的内容，`ToString`、`ToNumber`、`ToPrimitive`都是在 [JavaScript 深入系列之类型转换规则 ](./src/javascript/深入系列/JavaScript深入系列之类型转换规则.md)中讲到过的内容，所以我们直接进分析阶段：

让我们来举几个例子：

让我们来举几个例子：

### 1.Null 与数字

```js
console.log(null + 1)
```

按照规范的步骤进行分析：

1. lprim = ToPrimitive(null) 因为 null 是基本类型，直接返回，所以 lprim = null
2. rprim = ToPrimitive(1) 因为 1 是基本类型，直接返回，所以 rprim = 1
3. lprim 和 rprim 都不是字符串
4. 返回 ToNumber(null) 和 ToNumber(1) 的运算结果

接下来：

`ToNumber(null)` 的结果为 0，(回想上篇 `Number(null)`)，`ToNumber(1)` 的结果为 1

所以，`null + 1` 相当于 `0 + 1`，最终的结果为数字 `1`。

这个还算简单，看些稍微复杂的：

### 2.数组与数组

```js
console.log([] + [])
```

依然按照规范：

1. lprim = ToPrimitive([])，[]是数组，相当于 ToPrimitive([], Number)，先调用 valueOf 方法，返回对象本身，因为不是原始值，调用 toString 方法，返回空字符串""
2. rprim 类似。
3. lprim 和 rprim 都是字符串，执行拼接操作

所以，`[] + []`相当于 `"" + ""`，最终的结果是空字符串`""`。

看个更复杂的：

### 3.数组与对象

```js
// 两者结果一致
console.log([] + {})
console.log({} + [])
```

按照规范：

1. lprim = ToPrimitive([])，lprim = ""
2. rprim = ToPrimitive({})，相当于调用 ToPrimitive({}, Number)，先调用 valueOf 方法，返回对象本身，因为不是原始值，调用 toString 方法，返回 "[object Object]"
3. lprim 和 rprim 都是字符串，执行拼接操作

所以，`[] + {}` 相当于 `"" + "[object Object]"`，最终的结果是 "[object Object]"。

下面的例子，可以按照示例类推出结果：

```js
console.log(1 + true)
console.log({} + {})
console.log(new Date(2017, 04, 21) + 1) // 这个知道是数字还是字符串类型就行
```

结果是：

```js
console.log(1 + true) // 2
console.log({} + {}) // "[object Object][object Object]"
console.log(new Date(2017, 04, 21) + 1) // "Sun May 21 2017 00:00:00 GMT+0800 (CST)1"
```

### 注意

以上的运算都是在 `console.log` 中进行，如果你直接在 `Chrome` 或者 `Firebug` 开发工具中的命令行直接输入，你也许会惊讶的看到一些结果的不同，比如：

[![type1](https://camo.githubusercontent.com/8e967a28b4ae2d67cd7bf57d86463f6c31fb39e1ec20f4e5c6c10d35da9a734c/68747470733a2f2f67772e616c6963646e2e636f6d2f7466732f5442315737704941585937674b306a535a4b7a585861696b7058612d313032322d38322e6a7067)](https://camo.githubusercontent.com/8e967a28b4ae2d67cd7bf57d86463f6c31fb39e1ec20f4e5c6c10d35da9a734c/68747470733a2f2f67772e616c6963646e2e636f6d2f7466732f5442315737704941585937674b306a535a4b7a585861696b7058612d313032322d38322e6a7067)

我们刚才才说过 `{} + []` 的结果是 `"[object Object]"` 呐，这怎么变成了 `0` 了？

不急，我们尝试着加一个括号：

[![type2](https://camo.githubusercontent.com/54abd5cf06039bff11cb67ff38c14ffece48f57e1bc9fb4e3067dd700e79ab5f/68747470733a2f2f67772e616c6963646e2e636f6d2f7466732f5442316a4d384b41686e31674b306a535a4b5058585876555858612d313132342d37362e6a7067)](https://camo.githubusercontent.com/54abd5cf06039bff11cb67ff38c14ffece48f57e1bc9fb4e3067dd700e79ab5f/68747470733a2f2f67772e616c6963646e2e636f6d2f7466732f5442316a4d384b41686e31674b306a535a4b5058585876555858612d313132342d37362e6a7067)

结果又变成了正确的值，这是为什么呢？

其实，在不加括号的时候，`{}` 被当成了一个独立的空代码块，所以 `{} + []` 变成了 `+[]`，结果就变成了 0

同样的问题还出现在 `{} + {}` 上，而且火狐和谷歌的结果还不一样：

```js
{
}
;+{}
// 火狐： NaN
// 谷歌： "[object Object][object Object]"
```

如果 `{}` 被当成一个独立的代码块，那么这句话相当于 `+{}`，相当于 `Number({})`，结果自然是 `NaN`，可是 `Chrome` 却在这里返回了正确的值。

那为什么这里就返回了正确的值呢？我也不知道，欢迎解答~

## == 相等

### 规范

`"=="` 用于比较两个值是否相等，当要比较的两个值类型不一样的时候，就会发生类型的转换。

关于使用"=="进行比较的时候，具体步骤可以查看[规范 11.9.5](http://es5.github.io/#x11.9.3)：

当执行 x == y 时：

1. 如果 x 与 y 是同一类型：
   1. x 是 Undefined，返回 true
   2. x 是 Null，返回 true
   3. x 是数字：
      1. x 是 NaN，返回 false
      2. y 是 NaN，返回 false
      3. x 与 y 相等，返回 true
      4. x 是+0，y 是-0，返回 true
      5. x 是-0，y 是+0，返回 true
      6. 返回 false
   4. x 是字符串，完全相等返回 true,否则返回 false
   5. x 是布尔值，x 和 y 都是 true 或者 false，返回 true，否则返回 false
   6. x 和 y 指向同一个对象，返回 true，否则返回 false
2. x 是 null 并且 y 是 undefined，返回 true
3. x 是 undefined 并且 y 是 null，返回 true
4. x 是数字，y 是字符串，判断 x == ToNumber(y)
5. x 是字符串，y 是数字，判断 ToNumber(x) == y
6. x 是布尔值，判断 ToNumber(x) == y
7. y 是布尔值，判断 x ==ToNumber(y)
8. x 是字符串或者数字，y 是对象，判断 x == ToPrimitive(y)
9. x 是对象，y 是字符串或者数字，判断 ToPrimitive(x) == y
10. 返回 false

觉得看规范判断太复杂？我们来分几种情况来看：

### 1. null 和 undefined

```js
console.log(null == undefined)
```

看规范第 2、3 步：

> 1. x 是 null 并且 y 是 undefined，返回 true

> 1. x 是 undefined 并且 y 是 null，返回 true

所以例子的结果自然为 `true`。

### 2. 字符串与数字

```js
console.log('1' == 1)
```

结果肯定是 true，问题在于是字符串转化成了数字和数字比较还是数字转换成了字符串和字符串比较呢？

看规范第 4、5 步：

> 4.x 是数字，y 是字符串，判断 x == ToNumber(y)

> 5.x 是字符串，y 是数字，判断 ToNumber(x) == y

结果很明显，都是转换成数字后再进行比较

### 3. 布尔值和其他类型

```js
console.log(true == '2')
```

当要判断的一方出现 `false` 的时候，往往最容易出错，比如上面这个例子，凭直觉应该是 `true`，毕竟 `Boolean('2')` 的结果可是 true，但这道题的结果却是 false。

归根到底，还是要看规范，规范第 6、7 步：

> 6.x 是布尔值，判断 ToNumber(x) == y

> 7.y 是布尔值，判断 x ==ToNumber(y)

当一方出现布尔值的时候，就会对这一方的值进行 ToNumber 处理，也就是说 true 会被转化成 1，

`true == '2'` 就相当于 `1 == '2'` 就相当于 `1 == 2`，结果自然是 `false`。

所以当一方是布尔值的时候，会对布尔值进行转换，因为这种特性，所以尽量少使用 `xx == true` 和 `xx == false` 的写法。

比如:

```
// 不建议
if (a == true) {}

// 建议
if (a) {}
// 更好
if (!!a) {}
```

### 4. 对象与非对象

```
console.log( 42 == ['42'])
```

看规范第 8、9 步：

> 1. x 不是字符串或者数字，y 是对象，判断 x == ToPrimitive(y)

> 1. x 是对象，y 不是字符串或者数字，判断 ToPrimitive(x) == y

以这个例子为例，会使用 `ToPrimitive` 处理 `['42']`，调用`valueOf`，返回对象本身，再调用 `toString`，返回 `'42'`，所以

`42 == ['42']` 相当于 `42 == '42'` 相当于`42 == 42`，结果为 `true`。

到此为止，我们已经看完了第 2、3、4、5、6、7、8、9 步，其他的一概返回 false。

### 其他

再多举几个例子进行分析：

```js
console.log(false == undefined)
```

`false == undefined` 相当于 `0 == undefined` 不符合上面的情形，执行最后一步 返回 `false`

```js
console.log(false == [])
```

`false == []` 相当于 `0 == []` 相当于 `0 == ''` 相当于 `0 == 0`，结果返回 `true

```js
console.log([] == ![])
```

首先会执行 `![]` 操作，转换成 false，相当于 `[] == false` 相当于 `[] == 0` 相当于 `'' == 0` 相当于 `0 == 0`，结果返回 `true`

最后再举一些会让人踩坑的例子：

```js
console.log(false == '0') // 0 == "0"
console.log(false == 0) // 0 == 0
console.log(false == '') // 0 == 0

console.log('' == 0) // 0 == 0
console.log('' == []) // "" == ""

console.log([] == 0) // 0 == 0

console.log('' == [null]) // "" == "" null在转换过程中被过滤了
console.log(0 == '\n') // \n是换行符, 就是空格回车, 所以是 0 == ToNumber(' ') 0 == 0
console.log([] == 0) // 0 == 0
```

以上均返回 true

## 其他

除了这两种情形之外，其实还有很多情形会发生隐式类型转换，比如`if`、`? :`、`&&`等情况，但相对来说，比较简单，就不再讲解。
