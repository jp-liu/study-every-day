# 执行上下文栈

首先说两点

1. 当 `JavaScript` 代码执行一段**可执行代码(executable code)**时，会创建对应的**执行上下文(execution context)**。

2. `JS` 引擎内部创建了 **执行上下文栈（Execution Context Stack，简称 ECS）**，用于管理 **执行上下文**。

## 1.可执行代码

这就要说到 JavaScript 的可执行代码(executable code)的类型有哪些了？

其实很简单, 就三种, **全局代码**, **函数代码**, **eval 代码**

比如说, 当执行到一函数的时候,就会进行准备工作,这里的"准备工作",说的专业一点就是**创建执行上下文(execution context)**

## 2.执行上下文栈

在 `JS` 中,可执行的代码多了去了,在函数作为一等公民的 `JavaScript` 中, 函数到处都是, 所以需要创建的 **执行上下文** 也是很多,这个时候,我们就需要了解, **执行上下文栈**, 看看它是如何帮助我们管理执行上下文的

首先,为了模拟执行上下文栈的行为, 我们先定义一个执行上下文栈为一个数组

> 注: 均为伪代码,仅为模拟了解

```js
const ECStack = []
```

在`JavaScript` 中, 最开始要解释执行的就是全局代码，所以初始化的时候首先就会向执行上下文栈压入一个**全局执行上下文**，我们用 `globalContext` 表示它，并且只有当整个应用程序结束的时候，`ECStack` 才会被清空，所以程序结束之前，

> 这里可以做个小小的思考转变, 就是将全局代码思考为一个立即执行函数,也就是需要为这个函数创建一个全局执行上下文,将其压入栈底,然后执行内部的代码

ECStack`最底部永远有个`globalContext`：

```js
ECStack = [globalContext]
```

现在 `JavaScript` 遇到下面的这段代码了：

```js
function fun3() {
  console.log('fun3')
}

function fun2() {
  fun3()
}

function fun1() {
  fun2()
}

fun1()
```

当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。知道了这样的工作原理，让我们来看看如何处理上面这段代码：

```js
// 执行 fun1(),为 fun1 创建执行上下文,然后压栈
ECStack.push(<fun1>, functionContext)

// fun1中竟然调用了fun2，还要创建fun2的执行上下文
ECStack.push(<fun2> functionContext);

// 擦，fun2还调用了fun3！
ECStack.push(<fun3> functionContext);
//此时的栈结构
ECStack = [
    fun3,
    fun2,
    fun1,
    globalContext
]

// fun3执行完毕
ECStack.pop();

// fun2执行完毕
ECStack.pop();

// fun1执行完毕
ECStack.pop();

// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext
ECStack = [
    globalContext
]
```

## 解答思考题

好啦，现在我们已经了解了执行上下文栈是如何处理执行上下文的，所以让我们看看上篇笔记[JavaScript 深入系列之执行上下文栈](./src/javascript/深入系列/JavaScript深入系列之执行上下文栈.md)最后的思考题：

```js
var scope = 'global scope'
function checkscope() {
  var scope = 'local scope'
  function f() {
    return scope
  }
  return f()
}
checkscope()
var scope = 'global scope'
function checkscope() {
  var scope = 'local scope'
  function f() {
    return scope
  }
  return f
}
checkscope()()
```

两段代码执行的结果一样，但是两段代码究竟有哪些不同呢？

答案就是执行上下文栈的变化不一样。

让我们模拟第一段代码：

```js
ECStack.push(<checkscope> functionContext);
ECStack.push(<f> functionContext);
ECStack.pop();
ECStack.pop();
```

让我们模拟第二段代码：

```js
ECStack.push(<checkscope> functionContext);
ECStack.pop();
ECStack.push(<f> functionContext);
ECStack.pop();
```

是不是有些不同呢？

当然了，这样概括的回答执行上下文栈的变化不同，是不是依然有一种意犹未尽的感觉呢，为了更详细讲解两个函数执行上的区别，我们需要探究一下执行上下文到底包含了哪些内容，所以欢迎阅读下一篇《JavaScript 深入系列之变量对象》。
