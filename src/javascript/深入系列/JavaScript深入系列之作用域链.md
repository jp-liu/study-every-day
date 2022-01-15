# 作用域链

## 前言

在上篇[JavaScript 深入系列之执行上下文栈](./src/javascript/深入系列/JavaScript深入系列之执行上下文栈.md)中讲到，当 `JavaScript` 代码执行一段 **可执行代码(executable code)**时，会创建对应的 **执行上下文(execution context)**。

对于每个**执行上下文**，都有三个重要属性：

- **变量对象(Variable object，VO): ** [JavaScript 深入系列之变量对象](./src/javascript/深入系列/JavaScript深入系列之变量对象.md)
- **作用域链(Scope chain)**
- **this**

今天重点是讲讲作用域链。

## 什么是作用域链?

作用域是程序源代码声明变量的区域, 作用域规定了如何查找变量, 也就是当前执行的代码对变量的**访问权限**

重点: **访问权限**

我们知道在 `JS` 中, 查找变量的时候, 会先从**当前上下文**的**变量对象**中查找,如果没有找到,就会从**父级(词法层面上的父级)执行上下文**的**变量对象**中查找,一直到**全局上下文**的**变量对象**,也就是**全局对象**,这样由着**执行上下文**的逐级查找**变量对象**而构成的链表结构就叫做**作用域链**

**作用域链: **通过保存作用域链, 来规定不同作用域可以访问不同的变量, 也就可以知道当前的作用域访问不同变量的**访问权限**了

下面, 通过函数的**创建**和**激活**,两个时期,来讲写一下作用域链是如何创建和变化的

## 函数创建

在 [JavaScript 深入系列之词法作用域和动态作用域](./src/javascript/深入系列/JavaScript 深入系列之词法作用域和动态作用域.md) 中说道, `JS` 中函数的作用域在定义的时候就已经确定了

这是因为函数有一个内部属性 `[[scope]]`, 当函数创建的时候, 就会保存所有**父变量对象**到其中, 可以理解为, `[[scope]]` 就是所有父变量对象的层级链, 但是注意: `[[scope]]` 并不代表完整的作用域链

举个栗子:

```js
function foo() {
    function bar() {
        ...
    }
}
```

函数创建时，各自的[[scope]]为：

```js
foo.[[scope]] = [globalContext.VO]

bar.[[scope]] = [
    fooContext.VO,
    globalContext.VO
]
```

## 函数激活

当函数激活的时候, 进入函数上下文, 创建 `VO/AO` 之后, 就会将**活动对象**加到**作用域链**的顶端

这个时候执行上下文的作用域链, 我们命名为 `Scope`

```js
Scope = [AO].concat([[Scope]])
```

至此, 作用域链创建完毕

## 捋一捋

以下面的栗子为例, 结合前面笔记的 **变量对象**和**执行上下文栈**, 我们来总结一下函数执行上下文中的作用域链和变量对象的创建过程:

```js
var scope = 'global scope'
function checkScope() {
  var scope2 = 'local scope'
  return scope2
}
checkScope()
```

执行过程如下:

1. 执行全局代码块, 执行代码前,做好准备工作

   - 创建**全局对象** 和 **全局执行上下文**,并将**全局上下文**的`VO`指向**全局对象**
   - **函数声明**, **变量声明** 添加至 `VO`

   ```js
   VO = {
   	// 引擎编译实现的内容,如 String, Number等等
       scope: undefined,
       checkScope: reference to function checkScope() { ... }
   }

   ECS = [
       globalContext
   ]

   checkScope.[[scope]] = [globalContext.VO]
   ```

2. 执行代码, 将全局`VO` 的 `scope` 属性赋值为 `global scope`

3. 遇到函数调用

   - 创建**函数执行上下文**, 然后将其压入**执行上下文栈**

     ```js
     ECS = [checkScopeContext, globalContext]
     ```

4. `checkScope` 函数并不立刻执行，开始做准备工作，

   1. 第一步：复制函数 `[[scope]]` 属性创建作用域链

      ```js
      checkscopeContext = {
          Scope: checkScope.[[scope]],
      }
      ```

   2. 第二步：用 `arguments` 创建活动对象，随后初始化活动对象，加入形参、函数声明、变量声明

      ```js
      checkscopeContext = {
          AO: {
              arguments: {
                  length: 0
              },
              scope2:undefined
          },
          Scope: checkScope.[[scope]],
      }
      ```

   3. 第三步：将活动对象压入 `checkScope` 作用域链顶端

      ```js
      checkScope.[[scope]] = [AO, [[Scope]]]
      ```

5. 准备工作做完，开始执行函数，随着函数的执行，修改 `AO` 的属性值

   ```js
   checkscopeContext = {
     AO: {
       arguments: {
         length: 0
       },
       scope2: 'local scope'
     },
     Scope: [AO, [[Scope]]]
   }
   ```

6. 查找到 `scope2` 的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出

   ```
   ECStack = [
       globalContext
   ];
   ```
