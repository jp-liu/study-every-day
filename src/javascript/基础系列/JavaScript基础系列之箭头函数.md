# 箭头函数

箭头函数是 `ES6` 的函数简写方式,非常方便使用,而且也有很多特有的特性,这次总结箭头函数特性和 `function` 声明函数的区别

## 1.箭头函数比普通函数更加简洁

- 如果没有参数，就直接写一个空括号即可
- 如果只有一个参数，可以省去参数的括号
- 如果有多个参数，用逗号分割
- 如果函数体的返回值只有一句，可以省略大括号
- 如果函数体不需要返回值，且只有一句话，可以给这个语句前面加一个 void 关键字。最常见的就是调用一个函数：

```js
// void 运算符, 对右侧表达式求值,恒返回 `undefined`
let fn = () => void doWhat()
```

## 2.箭头函数没有自己的 this

箭头函数不会创建自己的 `this`， 所以它没有自己的 `this`，它只会在自己作用域的上一层继承`this`。所以箭头函数中 `this` 的指向在它在定义时已经确定了，之后不会改变。

可以⽤ `Babel` 理解⼀下箭头函数:

```js
// ES6
const obj = {
  getArrow() {
    return () => {
      console.log(this === obj)
    }
  }
}
```

转化后：

```js
// ES5，由 Babel 转译
var obj = {
  getArrow: function getArrow() {
    var _this = this
    return function () {
      console.log(_this === obj)
    }
  }
}
```

## 3.箭头函数继承来的 `this` 指向永远不会改变

```js
var id = 'GLOBAL'
var obj = {
  id: 'OBJ',
  a: function () {
    console.log(this.id)
  },
  b: () => {
    console.log(this.id)
  }
}
obj.a() // 'OBJ'
obj.b() // 'GLOBAL'
new obj.a() // undefined
new obj.b() // Uncaught TypeError: obj.b is not a constructor
```

对象 `obj` 的方法 `b`是使用箭头函数定义的，这个函数中的 `this` 就永远指向它定义时所处的全局执行环境中的 `this`，即便这个函数是作为对象 `obj` 的方法调用，`this` 依旧指向`window` 对象。需要注意，定义对象的大括号`{}`是创建对象,不是一个代码块, 无法形成一个作用域的，所以它依旧是处于全局执行环境中。

## 4.call()、apply()、bind()等方法不能改变箭头函数中 this 的指向

```js
var id = 'Global'
let fun1 = () => {
  console.log(this.id)
}
fun1() // 'Global'
fun1.call({ id: 'Obj' }) // 'Global'
fun1.apply({ id: 'Obj' }) // 'Global'
fun1.bind({ id: 'Obj' })() // 'Global'
```

## 5.箭头函数不能作为构造函数使用

构造函数实例化对象的过程:

1. 创建一个空对象
2. 将 `this` 指向这个空对象
3. 继续执行构造函数,向 `this` 中添加属性和方法
4. 返回这个对象

构造函数在 `new` 的步骤在上面已经说过了，实际上第二步就是将函数中的 `this` 指向该对象。 但是由于箭头函数时没有自己的 `this` 的，且 `this` 指向外层的执行环境，且不能改变指向，所以不能当做构造函数使用。

## 6.箭头函数没有自己的`arguments`

箭头函数没有自己的 `arguments` 对象。在箭头函数中访问 `arguments` 实际上获得的是它外层函数的 `arguments` 值。

## 7.箭头函数没有`prototype`
