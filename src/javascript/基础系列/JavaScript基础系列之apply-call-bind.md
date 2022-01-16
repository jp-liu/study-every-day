# apply、call、bind

> 这里先总结一下三个函数的使用和区别,在深入系列中,通过 `js` 模拟实现一下三个方法

第一,先说一下三者的作用

举个一个栗子：

```js
function Fruits() {}

Fruits.prototype = {
  color: 'red',
  say: function () {
    console.log('My color is ' + this.color)
  }
}

var apple = new Fruits()
apple.say() //My color is red
```

但是如果我们有一个对象 `banana= {color : "yellow"}` ,我们不想对它重新定义 say 方法，那么我们可以通过 call 或 apply 用 apple 的 say 方法：

```js
banana = {
  color: 'yellow'
}
apple.say.call(banana) // My color is yellow
apple.say.apply(banana) // My color is yellow
apple.say.bind(banana)() // My color is yellow
```

所以，可以看出 `call` 和 `apply` `bind` 是为了动态改变 `this` 指向而出现的，当一个 `object` 没有某个方法（本栗子中 `banana` 没有 `say` 方法），但是其他的有（本栗子中 `apple` 有 `say` 方法），我们可以借助 `call` 或 `apply` 用其它对象的方法来操作。

> 函数/方法 照常执行,只是内部 `this` 变化

既然三者作用相同,拿来看看为什么会出现三个呢,我们来看一下它们的区别

现将它们分成两类

## 1.立即调用的 apply/call

对于 apply、call 二者而言，作用完全一样，只是接受参数的方式不太一样。例如，有一个函数定义如下：

```js
var func = function (arg1, arg2) {}
```

就可以通过如下方式来调用：

```js
func.call(this, arg1, arg2) // 需要每个参数传递
func.apply(this, [arg1, arg2]) // 需要传递数组
```

其中 this 是你想指定的上下文，他可以是任何一个 JavaScript 对象(JavaScript 中一切皆对象)，**call 需要把参数按顺序传递进去，而 apply 则是把参数放在数组里。**

**JavaScript 中，某个函数的参数数量是不固定的，因此要说适用条件的话，当你的参数是明确知道数量时用 call 。
而不确定的时候用 apply，然后把参数 push 进数组传递进去。当参数数量不确定时，函数内部也可以通过 arguments 这个伪数组来遍历所有的参数。**

## 2.返回新函数定义的 bind

`bind` 和 `call/apply` 有一个很重要的区别，**一个函数被 call/apply 的时候，会立即执行函数，但是 bind 会创建一个新函数，不会立即执行**。

```js
var obj = {
  x: 81
}

var foo = {
  getX: function () {
    return this.x
  }
}

console.log(foo.getX.bind(obj)()) // 81
console.log(foo.getX.call(obj)) // 81
console.log(foo.getX.apply(obj)) // 81
```

三个输出的都是 81，但是注意看使用 `bind()` 方法的，他后面多了对括号。也就是说，区别是，当你希望改变上下文环境之后并非立即执行，而是回调执行的时候，使用`bind()` 方法。而 `apply/call` 则会立即执行函数。

当这个新函数被调用时，`bind()` 的第一个参数将作为它运行时的 `this`，传入 `bind()` 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。

如上，**bind 另一个重要的区别是，后面传入的这个参数列表可以分多次传入，call 和 apply 则必须一次性传入所有参数。**

示例：

```js
var arr = [1, 10, 5, 8, 12]
var max = Math.max.bind(null, arr[0], arr[1], arr[2], arr[3])
console.log(max(arr[4])) //12，分两次传参
```

可以看出，`bind` 方法可以分多次传参，最后函数运行时会把所有参数连接起来一起放入函数运行。
