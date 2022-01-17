call 和 apply 的模拟实现

> 先说一声, 我们自己实现,就没有考虑过多的边界情况, 底层是拿 `C` 写的,目前属于黑盒, 我们模拟实现,主要是梳理逻辑, 增强编码理解的能力

## 1. call

一句话介绍 call：

> call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。

举个例子：

```js
var foo = {
  value: 1
}

function bar() {
  console.log(this.value)
}

bar.call(foo) // 1
```

注意两点：

1. call 改变了 this 的指向，指向到 foo
2. bar 函数执行了

### 1.1 模拟实现第一步

我们需要怎么样,才能变更 `this` 指向呢, 我们目前可利用的方式, 是按照之前的笔记记录, `this` 的确定

    1. 简单来说,就是 **谁调用函数, 就是谁**
    2. 从规范来说, 我们需要得到 `MemberExpression` 计算返回的 `ref` 是一个 `Reference` 类型, 并且 **IsPropertyReference(ref)** 是 **true**, 那么 **this** 的值为 **GetBase(ref)**

这里我们先采用简单的理论来看下效果:

这就需要, 指定的 `this` 对象,拥有对应的函数,并且调用, 那么 `this` 就很好定了

这里改造一下 `foo` 对象如下:

```js
var foo = {
  value: 1,
  bar: function () {
    console.log(this.value)
  }
}

foo.bar() // 1
```

这个时候很明显, `this` 必然指向 `foo` ,可以套用一下上面的两个验证方式

是不是很简单呢?

不过这样却给 `foo` 对象本身添加了一个属性, 这不行啊, 我们用完需要调用 `delete` 将它再删除掉

所以我们的模拟步骤就可以分为:

1. 将函数设为对象的属性
2. 执行该属性
3. 删除该属性

就像这样

```js
// 第一步
foo.fn = bar
// 第二步
foo.fn()
// 第三步
delete foo.fn
```

`fn` 是对象的属性名，反正最后也要删除它，所以起成什么都无所谓。

> 这里涉及到 如果对象本身就有这个属性的情况, 不过事先我们说了,这是模拟实现, 不必考虑这个, 实际也不会用的, 哈哈
>
> 不过为了唯一性,也可以使用 `symbol` 符号来定义啊

根据这个思路，我们可以尝试着去写第一版的 **call2** 函数：

```js
Function.prototype.jpCall = function (context) {
  // 1.获取调用的函数
  const fn = this

  // 2.绑定对象属性
  const symbol = Symbol('fn')
  context[symbol] = fn

  // 3.调用函数
  context[symbol]()

  // 4.删除属性
  delete context[symbol]
}

// 测试一下
const foo = {
  value: 1
}

function bar() {
  console.log(this.value)
}

bar.jpCall(foo) // 1
```

实现了第一步, 那么就该第二步了, 加入参数在进行调用

### 1.2 模拟实现第二步

我们是可以通过调用, 提供**不定长**的参数的

```js
var foo = {
  value: 1
}

function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value)
}

bar.call(foo, 'kevin', 18)
// kevin
// 18
// 1
```

这个参数如何操作呢, 我们可以通过两个方式, 第一个方式是 `arguments`, 第二个方式就是使用 ES6 的剩余参数

```js
// @ts-nocheck
Function.prototype.jpCall = function (context, ...args) {
  // 1.获取调用的函数, 还有参数
  const fn = this
  // 1.1 参数获取方式一
  // const args = []
  // for (let i = 1, len = arguments.length; i < len; i++) {
  //   args.push('arguments[' + i + ']')
  // }
  // 1.2 使用 rest 参数 ...args

  // 2.绑定对象属性
  const symbol = Symbol('fn')
  context[symbol] = fn

  // 3.调用函数
  // eval('context[symbol](' + args + ')')
  context[symbol](...args)

  // 4.删除属性
  delete context[symbol]
}

// 测试一下
const foo = {
  value: 1
}

function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value)
}

bar.jpCall(foo, 'kevin', 18)
// kevin
// 18
// 1
```

### 1.3 模拟实现第三步

模拟代码已经完成 80%，还有两个小点要注意：

**1.this 参数可以传 null，当为 null 的时候，视为指向 window**

举个例子：

```js
var value = 1

function bar() {
  console.log(this.value)
}

bar.call(null) // 1
```

虽然这个例子本身不使用 call，结果依然一样。

**2.函数是可以有返回值的！**

举个例子：

```js
var obj = {
  value: 1
}

function bar(name, age) {
  return {
    value: this.value,
    name: name,
    age: age
  }
}

console.log(bar.call(obj, 'kevin', 18))
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }
```

不过都很好解决，让我们直接看第三版也就是最后一版的代码：

```js
Function.prototype.jpCall = function (context, ...args) {
  // this 异常判断
  context = context ? Object(context) || globalThis

  // 1.获取调用的函数, 还有参数
  const fn = this

  // 2.绑定对象属性
  const symbol = Symbol('fn')
  context[symbol] = fn

  // 3.调用函数
  const result = context[symbol](...args)

  // 4.删除属性
  delete context[symbol]

  // 5.返回值
  return result
}

// 测试一下
// eslint-disable-next-line no-unused-vars
const value = 2

const obj = {
  value: 1
}

function bar(name, age) {
  // this指定为null或者undefined, node 运行是 undefined
  // 因为 node 会对文件进行编译包装,为立即执行函数
  // 传入 require, module, exports...
  // 所以指定this之后,当前文件并不是全局,不是通过作用域链访问,
  // 而是原型链,全局上没有, 整个node 环境才是
  console.log(this.value)
  return {
    value: this.value,
    name: name,
    age: age
  }
}

bar.jpCall(null) // 2

console.log(bar.jpCall(obj, 'kevin', 18))
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }
```

## apply 的模拟实现

apply 的实现跟 call 类似，在这里直接给代码

```js
Function.prototype.jpApply = function (context, arr) {
  // this 异常判断
  context = context ? Object(context) : globalThis

  // 1.获取调用的函数, 还有参数
  const fn = this

  // 2.绑定对象属性
  const symbol = Symbol('fn')
  context[symbol] = fn

  // 3.调用函数
  const result = arr ? context[symbol](...arr) : context[symbol]()

  // 4.删除属性
  delete context[symbol]

  // 5.返回值
  return result
}

// 测试一下
// eslint-disable-next-line no-unused-vars
var value = 2

var obj = {
  value: 1
}

function bar(name, age) {
  console.log(this.value)
  return {
    value: this.value,
    name: name,
    age: age
  }
}

bar.jpApply(null) // 2

console.log(bar.jpApply(obj, ['kevin', 18]))
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }
```
