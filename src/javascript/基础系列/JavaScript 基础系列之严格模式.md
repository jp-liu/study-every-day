# 严格模式

## 什么是严格模式 `"use strict"`？

使用 **严格模式** 会对**脚本** 或者 **函数** 启动更加严格的检查来避免失误引起的错误。

## 为脚本开启严格模式

为整个脚本文件开启严格模式，需要在所有语句之前放一个特定语句 `'use strict'`

```js
// 整个脚本都开启严格模式的语法
'use strict'
var v = "Hi!  I'm a strict mode script!"
```

这种语法存在陷阱：不能盲目的合并冲突代码。试想合并一个严格模式的脚本和一个非严格模式的脚本：合并后的脚本代码看起来是严格模式。反之亦然：非严格合并严格看起来是非严格的。合并均为严格模式的脚本或均为非严格模式的都没问题，只有在合并严格模式与非严格模式有可能有问题。建议按一个个函数去开启严格模式（至少在学习的过渡期要这样做）。

## 为函数开启严格模式

同样的，要给某个函数开启严格模式，得把 `"use strict";` 声明一字不漏地放在函数体所有语句之前。

```js
function doSomething(val) {
  'use strict'
  x = val + 10
}
```

## 举例严格模式的一些规则：

### 全局变量显式声明

在正常模式中，如果一个变量没有声明就赋值，默认是全局变量。严格模式禁止这种用法，全局变量必须显式声明。

```js
'use strict'
a = 1
```

上面的写法报错：`Uncaught ReferenceError: a is not defined`

### 变量都必须先声明，再使用

严格模式下，变量都必须先用 var 命令声明，然后再使用。

```js
function doSomething() {
  'use strict'
  x = 10
  console.log(x)
}

doSomething()
```

上面的写法报错：`Uncaught ReferenceError: x is not defined`

非严格模式下：

```js
function doSomething() {
  x = 10
  console.log(x)
}

doSomething()
```

上面的写法会正常输出 10 ，不会报错。

### 重名错误

严格模式下：

- 对象不能有重名的属性
- 函数不能有重名的参数

### 禁止删除变量

严格模式下无法删除变量。

```js
'use strict'

var x

delete x // 语法错误

var o = Object.create(null, {
  x: {
    value: 1,
    configurable: true
  }
})

delete o.x // 删除成功
```

对象的访问器属性 [JavaScript 基础系列之数据类型](./src/javascript/基础系列/JavaScript 基础系列之数据类型.md)

只有 `configurable` 设置为 `true` 的对象属性，才能被删除。

### 保留字

为了向将来 Javascript 的新版本过渡，严格模式新增了一些保留字：implements, interface, let, package, private, protected, public, static, yield。

使用这些词作为变量名将会报错。

```
function package(protected) { // 语法错误

	"use strict";

	var implements; // 语法错误
}
```

### this 指向问题

严格模式下，函数内的 `this` 会被绑定到 `undefined` 上，在非严格模式下则会被绑定到全局对象`window/global`上。

```js
var a = 100

function f1() {
  console.log(this)
}

console.group('正常模式下：')
f1()
console.groupEnd()
```

[![在这里插入图片描述](https://camo.githubusercontent.com/90de62215fe54e4743da44c9bd9df364c40cf735a2bfaf88b16562a17a081a22/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f39626631366130613136336134626261613765653034363135656137393830652e706e67)](https://camo.githubusercontent.com/90de62215fe54e4743da44c9bd9df364c40cf735a2bfaf88b16562a17a081a22/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f39626631366130613136336134626261613765653034363135656137393830652e706e67)

```js
'use strict'

var a = 100
function f1() {
  console.log(this)
}
console.group('严格模式下:')
f1()
console.groupEnd()
```

[![在这里插入图片描述](https://camo.githubusercontent.com/e049198aa96ee997714ae41444dcee4074d28492f24af21266b87b9b22450101/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f37656463363738363233343934373034396566316231626531623434656533612e706e67)](https://camo.githubusercontent.com/e049198aa96ee997714ae41444dcee4074d28492f24af21266b87b9b22450101/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f37656463363738363233343934373034396566316231626531623434656533612e706e67)
