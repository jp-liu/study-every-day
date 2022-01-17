# bind 的模拟实现

一句话介绍 bind:

> bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )

由此我们可以首先得出 bind 函数的两个特点：

1. 返回一个函数
2. 可以传入参数

## 返回函数的模拟实现

从第一个特点开始，我们举个例子：

```
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

// 返回了一个函数
var bindFoo = bar.bind(foo);

bindFoo(); // 1
```

关于指定 this 的指向，我们可以使用 call 或者 apply 实现，关于 call 和 apply 的模拟实现，可以查看[JavaScript 深入系列之 call 和 apply 的模拟实现](./JavaScript深入系列之call和apply的模拟实现.md)。我们来写第一版的代码：

```js
// 第一版, 不需要参数
Function.prototype.jpBind = function (context) {
  // 1.this 异常判断
  context = context ? Object(context) : globalThis

  // 2.获取调用的函数
  const self = this
  return function () {
    return self.apply(context)
  }
}
```

此外，之所以 `return self.apply(context)`，是考虑到绑定函数可能是有返回值的，依然是这个例子：

```js
var foo = {
  value: 1
}

function bar() {
  return this.value
}

var bindFoo = bar.bind(foo)

console.log(bindFoo()) // 1
```

## 传参的模拟实现

接下来看第二点，可以传入参数。这个就有点让人费解了，我在 bind 的时候，是否可以传参呢？我在执行 bind 返回的函数的时候，可不可以传参呢？让我们看个例子：

```js
var foo = {
  value: 1
}

function bar(name, age) {
  console.log(this.value)
  console.log(name)
  console.log(age)
}

var bindFoo = bar.bind(foo, 'daisy')
bindFoo('18')
// 1
// daisy
// 18
```

函数需要传 name 和 age 两个参数，竟然还可以在 bind 的时候，只传一个 name，在执行返回的函数的时候，再传另一个参数 age!

这可咋办？不急，我们用 arguments 进行处理：

```js
// 第二版, 要参数
Function.prototype.jpBind = function (context) {
  // 1.this 异常判断
  context = context ? Object(context) : globalThis

  // 第一种方式, 获取jpBind函数从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1)

  // 2.获取调用的函数
  const self = this
  return function () {
    // 这个时候的arguments是指bind返回的函数传入的参数
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(context, args.concat(bindArgs))
  }
}

// 第二种获取参数的方式,直接使用 rest 参数,方便快捷
Function.prototype.jpBind = function (context, ...args) {
  // 1.this 异常判断
  context = context ? Object(context) : globalThis

  // 2.获取调用的函数
  const self = this
  return function (...arr) {
    return self.apply(context, [...args, ...arr])
  }
}
```

## 构造函数效果的模拟实现

完成了这两点，最难的部分到啦！因为 bind 还有一个特点，就是

> 一个绑定函数也能使用 new 操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

也就是说当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。举个例子：

```js
var value = 2

var foo = {
  value: 1
}

function bar(name, age) {
  this.habit = 'shopping'
  console.log(this.value)
  console.log(name)
  console.log(age)
}

bar.prototype.friend = 'kevin'

var bindFoo = bar.bind(foo, 'daisy')

var obj = new bindFoo('18')
// undefined
// daisy
// 18
console.log(obj.habit)
console.log(obj.friend)
// shopping
// kevin
```

注意：尽管在全局和 `foo` 中都声明了 `value` 值，最后依然返回了 `undefind`，说明绑定的 `this` 失效了，如果大家了解 `new` 的模拟实现，就会知道这个时候的 `this` 已经指向了 `obj`。

其实绑定 `this` 也有优先级,这里是应用在基础篇中 `this` 的规则的,可以去看下 [JavaScript 基础系列之 this 指向问题](./src/javascript/基础系列/JavaScript基础系列之this指向问题.md), 这里直接说下结论

1. 显示绑定优于隐式绑定
2. `new` 优于显示绑定, 并且 `new` 关键字不能和 `apply/call` 一起来使用

> new 绑定 > 显示绑定(apply/call/bind) > 隐式绑定(obj.foo()) > 默认绑定(独立函数调用)

所以我们可以通过修改返回的函数的原型来实现，让我们写一下：

```js
// 第三版, 判断 new 调用情况
Function.prototype.jpBind = function (context, ...args) {
  // 1.this 异常判断
  context = context ? Object(context) : globalThis

  // 2.获取调用的函数
  const self = this

  function bindCtr(...arr) {
    // 判断是否 new 调用,如果是创建实例
    // 则 this 会指向通过构造函数创建的对象
    return self.apply(this instanceof bindCtr ? this : context, [
      ...args,
      ...arr
    ])
  }

  // 3.保持原有原型链不变,避免变更,因为this变更无效,不能用需要使用旧的原型
  bindCtr.prototype = this.prototype

  return bindCtr
}
```

## 构造函数效果的优化实现

但是在这个写法中，我们直接将 bindCtr.prototype = this.prototype，我们直接修改 bindCtr.prototype 的时候，也会直接修改原始绑定函数的 prototype，他们共享了一个对象，哪怕是副本。这个时候，我们可以通过一个空函数来进行中转，避免共享：

```js
// 第三版, 判断 new 调用情况,优化,避免修改原函数的原型
Function.prototype.jpBind = function (context, ...args) {
  // 1.this 异常判断
  context = context ? Object(context) : globalThis

  // 2.获取调用的函数
  const self = this

  // 3.创建中转函数
  function Noop() {}

  function bindCtr(...arr) {
    // 判断是否 new 调用,如果是创建实例
    // 则 this 会指向通过构造函数创建的对象
    return self.apply(this instanceof bindCtr ? this : context, [
      ...args,
      ...arr
    ])
  }

  // 3.中转
  Noop.prototype = this.prototype

  // 4.保持原有原型链不变,避免变更
  bindCtr.prototype = new Noop()

  return bindCtr
}

var value = 2

var foo = {
  value: 1
}

function bar(name, age) {
  this.habit = 'shopping'
  console.log(this.value)
  console.log(name)
  console.log(age)
}

bar.prototype.friend = 'kevin'

var BindFoo = bar.bind(foo, 'daisy')

var obj = new BindFoo('18')
// undefined
// daisy
// 18
console.log(obj.habit)
console.log(obj.friend)
// shopping
// kevin
```

这边创建中转函数的逻辑就是和 `Object.create(this.prototype)` 是一样的, `Object.create` 的模拟实现就是这样

```js
Object.create = function (o) {
  function f() {}
  f.prototype = o
  return new f()
}
```
