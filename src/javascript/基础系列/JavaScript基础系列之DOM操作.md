# DOM 操作

`JavaScript` 本来是用来做浏览器表单的,随着发展,越来越重要,前端开发的交互都离不开 `js` 了,虽然原生 `js` 操作 `DOM` 性能代价很大,慢慢的使用在交互中使用原生 `js` 操作 `DOM` 的情况少了, 但是还是需要学习基本的操作,后面需要使用再查漏补缺

## 1.DOM 节点的获取

DOM 节点的获取的 API 及使用：

```js
// getElementById          // 按照 id 查询
// getElementsByTagName    // 按照标签名查询
// getElementsByClassName  // 按照类名查询
// querySelector           // 按照 css 选择器查询
// querySelectorAll        // 按照 css 选择器查询

// 按照 id 查询
var imooc = document.getElementById('imooc') // 查询到 id 为 imooc 的元素
// 按照标签名查询
var pList = document.getElementsByTagName('p') // 查询到标签为 p 的集合
console.log(divList.length)
console.log(divList[0])
// 按照类名查询
var moocList = document.getElementsByClassName('mooc') // 查询到类名为 mooc 的集合
// 按照 css 选择器查询
var pList1 = document.querySelector('.mooc') // 查询到类名为 mooc 的第一个元素
// 按照 css 选择器查询
var pList2 = document.querySelectorAll('.mooc') // 查询到类名为 mooc 的集合
```

## 2.DOM 节点的创建

**创建一个新节点，并把它添加到指定节点的后面。** 已知的 HTML 结构如下：

```html
<div id="container">
  <h1 id="title">我是标题</h1>
</div>
```

要求添加一个有内容的 `span` 节点到 id 为 title 的节点后面，做法就是：

```js
// 首先获取父节点
var container = document.getElementById('container')
// 创建新节点
var targetSpan = document.createElement('span')
// 设置 span 节点的内容
targetSpan.innerHTML = 'hello world'
// 把新创建的元素塞进父节点里去
container.appendChild(targetSpan)
```

## 3.DOM 节点的删除

**删除指定的 DOM 节点**， 已知的 HTML 结构如下：

```html
<div id="container">
  <h1 id="title">我是标题</h1>
</div>
```

需要删除 id 为 title 的元素，做法是：

```js
// 获取目标元素的父元素
var container = document.getElementById('container')
// 获取目标元素
var targetNode = document.getElementById('title')
// 删除目标元素
container.removeChild(targetNode)
```

或者通过子节点数组来完成删除：

```js
// 获取目标元素的父元素
var container = document.getElementById('container')
// 获取目标元素
var targetNode = container.childNodes[1]
// 删除目标元素
container.removeChild(targetNode)
```

**注意，`childNodes[1]`的下表是`1`，而不是`0`，`0`是`<div id="container"> `里最上面的文本。因为换行和空格也算是文本,这是没有被压缩的代码,如果压缩了,就是 childNodes[0]**

比如下面的 html 结构：

```html
<div id="container">
  <h1 id="title">我是标题</h1>
</div>
```

打印`<div id="container">`的`childNodes`：

```js
var container = document.getElementById('container')
console.log(container.childNodes)
```

[![在这里插入图片描述](https://camo.githubusercontent.com/8a2927a015371d421ba30f2a5900076f4c24f9b43627a021664dd92ed52efc7b/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f32323964616165356239323134386237613938376538383531363465656636622e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)](https://camo.githubusercontent.com/8a2927a015371d421ba30f2a5900076f4c24f9b43627a021664dd92ed52efc7b/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f32323964616165356239323134386237613938376538383531363465656636622e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

![HTML未格式化](/src/assets/image/基础系列/HTML未格式化.png)

![HTML未格式化childrenNodes](/src/assets/image/基础系列/HTML未格式化childrenNodes.png)

## 4.新增节点和移动节点

```js
var div1 = document.getElementById('div1')
// 添加新节点
var p1 = document.createElement('p')
p1.innerHTML = 'this is p1'
div1.appendChild(p1) // 添加新创建的元素
// 移动已有节点。注意，这里是“移动”，并不是拷贝
var p2 = document.getElementById('p2')
div1.appendChild(p2)
```

## 5.获取父元素

```js
var div1 = document.getElementById('div1')
var parent = div1.parentElement
```
