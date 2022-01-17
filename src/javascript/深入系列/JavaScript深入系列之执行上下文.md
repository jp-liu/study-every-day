# 执行上下文

## 前言

在上篇[JavaScript 深入系列之执行上下文栈](./JavaScript深入系列之执行上下文栈.md)中讲到，当 `JavaScript` 代码执行一段 **可执行代码(executable code)**时，会创建对应的 **执行上下文(execution context)**。

对于每个**执行上下文**，都有三个重要属性：

- **变量对象(Variable object，VO): ** [JavaScript 深入系列之变量对象](./JavaScript深入系列之变量对象.md)
- **作用域链(Scope chain): ** [JavaScript 深入系列之作用域链](./JavaScript深入系列之作用域链.md)
- **this** [JavaScript 深入系列之从 ECMAScript 规范解读 this](./JavaScript深入系列之从ECMAScript规范解读this.md)

到这里,我们已经深入了解了 **执行上下文** 的三个重要属性, 如果对上面的概念不是很清楚的话, 希望先阅读这些笔记。

因为这里就需要结合这所有内容, 来看看 **执行上下文** 的具体创建过程了。

对了先说下 **执行上下文** 的规范变化

- 早期执行上下文规范

  > Every execution context has associated with it a variable object Variables and functions declared in the source text are added as properties of the variable object. For function code,parameters are added as properties of the variable object.
  >
  > 每一个执行上下文会被关联到一个**变量对象**(variable object VO)，在源代码中的变量和函数声明会被作为属性添加到 `VO` 中。
  > 对于函数来说，参数也会被添加到 `VO` 中。

- 最新的 **ECMA** 规范版本中对于执行上下文的描述, 发生少许变更

  > Every execution context has an associated Variable Environment. Variables and functions declared in ECMA Script code evaluated in an execution context are added as bindings in that Variable Environment's Environment Record. For function code, parameters are also added as bindings to that Environment Record.
  >
  > 每一个执行上下文会关联到一个变量环境(Variable Environment)中，在执行代码中变量和函数的声明会作为环境记录(Environment Record)添加到变量环境中。
  > 对于函数来说，参数也会被作为环境记录添加到变量环境中

- 通过上面的变化我们可以知道，在最新的 ECMA 标准中，我们前面的 `变量对象VO` 已经有另外一个称呼了 `变量环境VE`

虽然只是词汇上的变化, 但是却更加严谨也更加易于实现, 之前必须使用对象来实现, 但是现在可以采用更多的数据结构或者性能更优的实现方式, 如 `map` 啥的

不过对于我们理解 **执行上下文** 来说,没有多大影响, 只是引擎实现方面可以更加灵活

## 思考题

在 [JavaScript 深入系列之词法作用域和动态作用域](./JavaScript 深入系列之词法作用域和动态作用域.md) 中，提出这样一道思考题：

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

两段代码都会打印'local scope'。虽然两段代码执行的结果一样，但是两段代码究竟有哪些不同呢？

紧接着就在下一篇 [JavaScript 深入系列之执行上下文栈](./JavaScript深入系列之执行上下文栈.md) 中，讲到了两者的区别在于 **执行上下文栈 **的变化不一样，然而，如果是这样笼统的回答，依然显得不够详细，本篇就会详细的解析执行上下文栈和执行上下文的具体变化过程。

## 具体执行流程分析

先来分析第一段代码:

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
```

执行过程如下:

1. 执行全局代码, 创建全局执行上下文, 全局上下文被压入执行上下文栈

   ```js
   ECStack = [globalContext]
   ```

2. 全局上下文初始化

   ```js
   globalContext = {
     VO: [global],
     Scope: [globalContext.VO],
     this: globalContext.VO
   }
   ```

3. 初始化的同时, `checkscope` 函数被创建, 保存作用域链到函数内部属性 [[scope]]

   ```js
   checkscope.[[scope]] = [
       globalContext.VO
   ]
   ```

4. 执行 `checkscope` 函数, 创建 `checkscope` 函数执行上下文, `checkscope` 函数执行上下文被压入执行上下文栈

   ```js
   ECStack = [checkscopeContext, globalContext]
   ```

5. `checkscope` 函数执行上下文初始化

   1. 复制函数 `[[scope]]` 属性创建作用域链，
   2. 用 `arguments` 创建活动对象，
   3. 初始化活动对象，即加入形参、函数声明、变量声明，
   4. 将活动对象压入 `checkscope` 作用域链顶端。

   同时 `f` 函数被创建，保存作用域链到 `f` 函数的内部属性 `[[scope]]`

   ```js
   checkscopeContext = {
       AO: {
           arguments: {
               length: 0
           },
           scope: undefined,
           f: reference to function f(){}
   	},
       Scope: [AO, globalContext.VO],
       this: undefined
   }
   ```

6. 执行 `f` 函数，创建 `f` 函数执行上下文，`f` 函数执行上下文被压入执行上下文栈

   ```js
   ECStack = [fContext, checkscopeContext, globalContext]
   ```

7. `f` 函数执行上下文初始化, 以下跟第 4 步相同：

   1. 复制函数 `[[scope]]` 属性创建作用域链
   2. 用 `arguments `创建活动对象
   3. 初始化活动对象，即加入形参、函数声明、变量声明
   4. 将活动对象压入 `f` 作用域链顶端

   ```js
   fContext = {
     AO: {
       arguments: {
         length: 0
       }
     },
     Scope: [AO, checkscopeContext.AO, globalContext.VO],
     this: undefined
   }
   ```

8. `f` 函数执行，沿着作用域链查找 `scope` 值，返回 `scope` 值,然后执行完毕,上下文出栈

   ```js
   ECStack = [checkscopeContext, globalContext]
   ```

9. `checkscope` 函数执行完毕，`checkscope` 执行上下文从执行上下文栈中弹出

   ```js
   ECStack = [globalContext]
   ```

第一段代码的执行就是这样的了,接下来看第二段

```js
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

前面的五个步骤都是一样,就不描述了

第五步到 `checkscope` 函数执行上下文初始化完毕, `f` 函数被解析, 保存了 **[[scope]] 作用域链**

接着后续

1. `checkscope` 函数执行完毕, 返回了 `f` 函数引用, `checkscope` 函数执行上下文出栈

   ```js
   ECStack = [globalContext]
   ```

2. 执行 `f` 函数，同上面的第六步

   ```js
   ECStack = [fContext, globalContext]
   ```

3. 初始化 `f` 的执行上下文, 同上面第七步

   ```js
   fContext = {
     AO: {
       arguments: {
         length: 0
       }
     },
     Scope: [AO, checkscopeContext.AO, globalContext.VO],
     this: undefined
   }
   ```

4. 同第八步,不过上下文栈变化如下

   ```js
   ECStack = [globalContext]
   ```
