# 变量对象

## 前言

在上篇[JavaScript 深入系列之执行上下文栈](./JavaScript深入系列之执行上下文栈.md)中讲到，当 `JavaScript` 代码执行一段 **可执行代码(executable code)**时，会创建对应的 **执行上下文(execution context)**。

对于每个**执行上下文**，都有三个重要属性：

- **变量对象(Variable object，VO)**
- **作用域链(Scope chain)**
- **this**

今天重点讲讲创建变量对象的过程。

什么是变量对象?

变量对象是与执行上下文相关的数据作用域, 存储了在上下文中定义的变量和函数声明。

因为不同执行上下文下的变量对象稍有不同，所以我们来聊聊全局上下文下的变量对象和函数上下文下的变量对象。

## 全局上下文

我们先了解一个概念，叫**全局对象**。在 [W3School](http://www.w3school.com.cn/jsref/jsref_obj_global.asp) 中也有介绍：

> 全局对象是预定义的对象，作为 JavaScript 的全局函数和全局属性的占位符。通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性。

> 在非严格模式下, 顶层 JavaScript 代码中，可以用关键字 this 引用全局对象。因为全局对象是作用域链的头，这意味着所有非限定性的变量和函数名都会作为该对象的属性来查询。

> 例如，当 JavaScript 代码引用 parseInt() 函数时，它引用的是全局对象的 parseInt 属性。全局对象是作用域链的头，还意味着在顶层 JavaScript 代码中声明的所有变量都将成为全局对象的属性。

如果看的不是很懂的话，容我再来介绍下全局对象:

1. 可以通过 this 引用，在客户端 JavaScript 中，全局对象就是 Window 对象。

   ```js
   console.log(this)
   ```

2. 全局对象是由 Object 构造函数实例化的一个对象。

   ```js
   console.log(this instanceof Object)
   ```

3. 预定义了一堆，嗯，一大堆函数和属性。

   ```js
   // 都能生效
   console.log(Math.random())
   console.log(this.Math.random())
   ```

4. 作为全局变量的宿主。

   ```js
   var a = 1
   console.log(this.a)
   ```

5. 浏览器客户端 JavaScript 中，全局对象有 window 属性指向自身。

   ```js
   var a = 1
   console.log(window.a)

   this.window.b = 2
   console.log(this.b)
   ```

花了一个大篇幅介绍全局对象，其实就想说：

**全局执行上下文( Global Execution Context )**中的**变量对象**就是**全局对象**呐！

## 函数上下文

在函数上下文中,我们采用 **活动对象(Activation Object, AO)**来表示变量对象

为什么这样呢?

其实变量对象和活动对象是同一个东西, 只是变量对象是规范定义的,引擎实现了,不是在 `JavaScript` 环境中存在和直接访问的,只有当进入一个执行上下文中的时候, 这个执行上下文中的变量对象才会被激活, 所以叫做 **activation object** ,只有被激活的变量对象,也就是活动对象上的属性和方法才能够被访问

活动对象实在进入函数上下文的时候创建的, 他通过函数的 `arguments` 属性初始化, `arguments` 属性值也是 `Arguments` 对象

## 执行过程

执行上下文的代码会分成两个阶段处理: 分析和执行,也就是

1. 进入执行上下文
2. 代码执行

### 1.进入执行上下文

当进入执行上下文的时候,这个时候并不会执行代码,而是初始化**变量对象**

变量对象初始化包括:

1. 函数的所有形参 ( 如果是函数上下文 )

   - 由名称和对应值组成的变量对象的属性被创建
   - 没有实参,属性值为 `undefined`

2. 函数声明

   - 由名称和对应值( 函数对象(function-object) ) 组成一个变量对象的属性被创建

     > 开辟一个内存空间,生成函数对象, 也就是 [函数名]: 内存地址

   - 如果变量对象已经存在相同名称的属性，则完全替换这个属性

3. 变量声明

   - 由名称和对应值（undefined）组成一个变量对象的属性被创建；
   - 如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性

举个栗子：

```js
function foo(a) {
  var b = 2
  function c() {}
  var d = function () {}

  b = 3
}

foo(1)
```

在进入上下文之后, 此时的 `AO` 对象:

```js
AO = {
	arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c() {},
    d: undefined
}
```

> 这里说一句,变量提升的问题,
>
> 前面说道了 JS 是需要被编译为机器指令才能让计算机执行的,
>
> 那么在代码执行前，在 `parser` 转成 `AST` 的过程中，会将使用 `var` 定义的变量、函数声明等加入到 `AO` 中，但是并不会赋值, 初始值为 `undefined`, 就是这个进入上下文的动作, 就是全局上下文没有第一步；
>
> 这个过程也称之为 **变量的作用域提升（hoisting）**

### 2.代码执行

在代码执行阶段, 会按顺序执行代码, 根据代码,修改变量对象的值

还是上面的栗子, 当代码执行完毕之后, 这个时候的 `AO` 对象是这样的:

```js
AO = {
    arguments: {
        0: 1,
        length: 1,
    },
    a: 1,
    b: 3,
    c: reference to function c() {},
    d: reference to FunctionExpression 'd'
}
```

## 总结

1. **全局上下文**的**变量对象**初始化为**全局对象**
2. **函数上下文**的**变量对象**初始化只包括 `Arguments` 对象
3. 在进入执行上下文阶段, 会给**变量对象**添加**形参**, **函数声明**, **变量声明**等出示的属性值
4. 在代码执行阶段, 会再次修改**变量对象**的属性值

## 思考题

看完了 **执行上下文栈** **执行上下文的变量对象**, 再来看下这几个简单的思考题

最后让我们看几个例子：

1.第一题

```js
function foo() {
  console.log(a)
  a = 1
}

foo() // ???

function bar() {
  a = 1
  console.log(a)
}
bar() // ???
```

第一段会报错：`Uncaught ReferenceError: a is not defined`。

第二段会打印：`1`。

这是因为函数中的 "a" 并没有通过 var 关键字声明，所以不会被存放在 `AO` 中。

第一段执行 console 的时候， AO 的值是：

```js
AO = {
  arguments: {
    length: 0
  }
}
```

没有 a 的值，然后就会到全局去找，全局也没有，所以会报错。

当第二段执行 console 的时候，全局对象已经被赋予了 a 属性，这时候就可以从全局找到 a 的值，所以会打印 1。

2.第二题

```js
console.log(foo) // ƒ foo(){ console.log("foo"); }

function foo() {
  console.log('foo')
}

var foo = 1
```

会打印函数，而不是 `undefined` 。

这是因为在进入执行上下文时，首先会处理函数声明，其次会处理变量声明，如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。
