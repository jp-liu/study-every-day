## 类数组对象

所谓的类数组对象:

> 拥有一个 length 属性和若干索引属性的对象

举个例子：

```js
var array = ['name', 'age', 'sex']

var arrayLike = {
  0: 'name',
  1: 'age',
  2: 'sex',
  length: 3
}
```

即便如此，为什么叫做类数组对象呢？

我个人感觉, 这个主要与我们日常所需要的操作有关

1. 在 `JS` 中数组的使用是十分灵活的, 增删改查都十分方便
2. 类数组虽然可以和数组一样,通过是一样, 下标获取对应值,但终究是对象,对于对象的增删改查不如数组

结合上两点, 可以透露出一个信息, 类数组不希望被灵活操作, 我们类数组主要应用场景在于函数参数 `arguments` ,还有 `DOM` 查询中, 这两个地方都是不希望被灵活操作的地方, 个人感觉哦

那接下来让我们从读写、获取长度、遍历三个方面看看这两个对象。到底有什么区别

## 读写

```js
console.log(array[0]) // name
console.log(arrayLike[0]) // name

array[0] = 'new name'
arrayLike[0] = 'new name'
```

## 长度

```js
console.log(array.length) // 3
console.log(arrayLike.length) // 3
```

## 遍历

```js
for (var i = 0, len = array.length; i < len; i++) {
  //……
}
for (var i = 0, len = arrayLike.length; i < len; i++) {
  //……
}
```

这些操作都是一样的, 存在差异的终究还是灵活性, 比如数组的方法类数组就不能够直接调用

```js
arrayLike.push('4')
```

然而上述代码会报错: arrayLike.push is not a function

## 调用数组方法

如果类数组就是任性的想用数组的方法怎么办呢？

既然无法直接调用，我们可以用 Function.call 间接调用：

```js
var arrayLike = { 0: 'name', 1: 'age', 2: 'sex', length: 3 }

Array.prototype.join.call(arrayLike, '&') // name&age&sex

Array.prototype.slice.call(arrayLike, 0) // ["name", "age", "sex"]
// slice可以做到类数组转数组

Array.prototype.map.call(arrayLike, function (item) {
  return item.toUpperCase()
})
// ["NAME", "AGE", "SEX"]
```

## 类数组转数组

在上面的例子中已经提到了一种类数组转数组的方法，再补充三个：

```js
var arrayLike = { 0: 'name', 1: 'age', 2: 'sex', length: 3 }
// 1. slice
Array.prototype.slice.call(arrayLike) // ["name", "age", "sex"]
// 2. splice
Array.prototype.splice.call(arrayLike, 0) // ["name", "age", "sex"]
// 3. ES6 Array.from
Array.from(arrayLike) // ["name", "age", "sex"]
// 4. apply
Array.prototype.concat.apply([], arrayLike)
```

## Arguments 对象

Arguments 对象只定义在函数体中，包括了函数的参数和其他属性。在函数体中，arguments 指代该函数的 Arguments 对象。

举个例子：

```js
function foo(name, age, sex) {
  console.log(arguments)
}

foo('name', 'age', 'sex')
```

打印结果如下：

![arguments](/src/assets/image/深入系列/arguments.png)

我们可以看到除了类数组的索引属性和 length 属性之外，还有一个 callee 属性，接下来我们一个一个介绍。

## length 属性

Arguments 对象的 length 属性，表示实参的长度，举个例子：

```js
function foo(b, c, d) {
  console.log('实参的长度为：' + arguments.length)
}

console.log('形参的长度为：' + foo.length)

foo(1)

// 形参的长度为：3
// 实参的长度为：1
```

## callee 属性

Arguments 对象的 callee 属性，通过它可以调用函数自身。

讲个闭包经典面试题使用 callee 的解决方法：

```js
var data = []

for (var i = 0; i < 3; i++) {
  ;(data[i] = function () {
    // 引用该函数的函数体内当前正在执行的函数
    // 也就是向函数对象上增加属性
    console.log(arguments.callee.i)
  }).i = i
}

data[0]()
data[1]()
data[2]()

// 0
// 1
// 2
```

## arguments 和对应参数的绑定

```js
function foo(name, age, sex, hobbit) {
  console.log(name, arguments[0]) // name name

  // 改变形参
  name = 'new name'

  console.log(name, arguments[0]) // new name new name

  // 改变arguments
  arguments[1] = 'new age'

  console.log(age, arguments[1]) // new age new age

  // 测试未传入的是否会绑定
  console.log(sex) // undefined

  sex = 'new sex'

  console.log(sex, arguments[2]) // new sex undefined

  arguments[3] = 'new hobbit'

  console.log(hobbit, arguments[3]) // undefined new hobbit
}

foo('name', 'age')
```

传入的参数，实参和 arguments 的值会共享，当没有传入时，实参与 arguments 值不会共享

除此之外，以上是在非严格模式下，如果是在严格模式下，实参和 arguments 是不会共享的。

## 传递参数

将参数从一个函数传递到另一个函数

```js
// 使用 apply 将 foo 的参数传递给 bar
function foo() {
  bar.apply(this, arguments)
}
function bar(a, b, c) {
  console.log(a, b, c)
}

foo(1, 2, 3)
```

## 强大的 ES6

使用 ES6 的 rest 剩余参数, ... 运算符，我们可以轻松转成数组。

```js
function func(...arguments) {
  console.log(arguments) // [1, 2, 3]
}

function func1(a, ...args) {
  console.log(arguments) // { 0: 1, 1: 2, 2: 3, length: 3 }
  console.log(args) // [2, 3]
}

func(1, 2, 3)
```
