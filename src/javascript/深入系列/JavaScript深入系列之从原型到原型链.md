# 从原型到原型链

我们先使用构造函数创建一个对象：

```js
function Person() {}
var person = new Person()
person.name = 'Kevin'
console.log(person.name) // Kevin
```

在这个例子中，Person 就是一个构造函数，我们使用 new 创建了一个实例对象 person。

很简单吧，接下来进入正题：

## 1.显示原型 prototype

每个函数都有一个 `prototype` 属性, 就是我们经常看到的那个 `prototype`, 比如在创建对象的各种方式中, 我们也说了很多 **原型属性**, 例如:

```js
function Person() {}
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Person.prototype.name = 'Kevin'
var p1 = new Person()
var p2 = new Person()
console.log(p1.name) // Kevin
console.log(p2.name) // Kevin
```

那函数自身的 `prototype` 属性指向的什么呢? 是这个函数的原型吗?

其实, 函数的 `prototype` 属性只相了一个对象, 就是调用当前构造函数而创建的**实例**的原型, 也就是上面例子中, `p1, p2` 的原型。

那什么是原型呢？你可以这样理解：每一个 JavaScript 对象(null 除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。

让我们用一张图表示构造函数和实例原型之间的关系：

![构造函数和实例原型的关系图](/src/assets/image/深入系列/构造函数和实例原型的关系图.png)

在这张图中我们用 Person.prototype 表示实例原型。

那么我们该怎么表示实例与实例原型，也就是 person 和 Person.prototype 之间的关系呢，这时候我们就要讲到第二个属性：

## 2.隐式原型 \***\*proto\*\***

这是每一个 JavaScript 对象(除了 null )都具有的一个属性，叫 **proto** ，这个属性会指向该对象的原型。

> 注意:
>
> **ECMA Script** 规范规定, 是每个对象除了 null 只有都有一个原型对象, 但是并没有声明如何实现
>
> 1. 在浏览器中, 这个规范被实现了, 每个对象都有一个非标准属性 ** proto ** 属性, 可以访问对象的原型对象, 这是为了让我们能够有据可依, 实际上是不推荐我们频繁更改这个属性的, 他会同步到其他的实例
>
>    备注: 因此不同浏览器的实现可能不一样
>
> 2. 在 **ES5** 的时候, 我们有一个标准方法, `Object.getPrototypeOf` 方法,可以获取对象原型
>
> 与其说是一个属性，不如说是一个 getter/setter，当使用 obj.** proto ** 时，可以理解成返回了 Object.getPrototypeOf(obj)。

我们可以在谷歌或者火狐浏览器中通过 ** proto** 访问对象原型, 比如:

```js
function Person() {}
var person = new Person()
console.log(person.__proto__ === Person.prototype) // true
```

于是我们更新下关系图：

![构造函数和实例对象的关系图](/src/assets/image/深入系列/构造函数和实例对象的关系图.png)

既然实例对象和构造函数都可以指向原型，那么原型是否有属性指向构造函数或者实例呢？

## 3.构造器 constructor

指向实例倒是没有，因为一个构造函数可以生成多个实例，但是原型指向构造函数倒是有的，这就要讲到第三个属性：constructor，每个原型都有一个 constructor 属性指向关联的构造函数。

constructor 是构造器，我们实例对象的属于什么类就是构造器决定的，比如

![实例对象的类型](/src/assets/image/深入系列/实例对象的类型.png)

为了验证这一点，我们可以尝试：

```js
function Person() {}
console.log(Person === Person.prototype.constructor) // true
```

所以再更新下关系图：

![显示原型和构造函数的关系](/src/assets/image/深入系列/显示原型和构造函数的关系.png)

综上我们已经得出：

```js
function Person() {}

var person = new Person()

console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true
```

了解了构造函数、实例原型、和实例之间的关系，接下来我们讲讲实例和原型的关系：

## 4.实例与原型

当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。

举个例子：

```js
function Person() {}

Person.prototype.name = 'Kevin'

var person = new Person()

person.name = 'Daisy'
console.log(person.name) // Daisy

delete person.name
console.log(person.name) // Kevin
```

在这个例子中，我们给实例对象 person 添加了 name 属性，当我们打印 person.name 的时候，结果自然为 Daisy。

但是当我们删除了 person 的 name 属性时，读取 person.name，从 person 对象中找不到 name 属性就会从 person 的原型也就是 person.**proto** ，也就是 Person.prototype 中查找，幸运的是我们找到了 name 属性，结果为 Kevin。

但是万一还没有找到呢？原型的原型又是什么呢？

## 5.原型的原型

在前面，我们已经讲了原型也是一个对象，既然是对象，我们就可以用最原始的方式创建它，那就是：

```js
var obj = new Object()
obj.name = 'Kevin'
console.log(obj.name) // Kevin
```

其实原型对象就是通过 Object 构造函数生成的，结合之前所讲，实例的 **proto** 指向构造函数的 prototype ，所以我们再更新下关系图：

## 6.原型链

那 Object.prototype 的原型呢？

null，我们可以打印：

```js
console.log(Object.prototype.__proto__ === null) // true
```

然而 null 究竟代表了什么呢？

引用阮一峰老师的 [《undefined 与 null 的区别》](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html) 就是：

> null 表示“没有对象”，即该处不应该有值。

所以 Object.prototype.**proto** 的值为 null 跟 Object.prototype 没有原型，其实表达了一个意思。

所以查找属性的时候查到 Object.prototype 就可以停止查找了。

最后一张关系图也可以更新为：

![原型链](/src/assets/image/深入系列/原型链.png)

顺便还要说下，图中由相互关联的原型组成的链状结构就是原型链，也就是蓝色的这条线。

其实就是一个通过链表一步步原型链接起来的链式结构，就是我们的原型链。

## 补充

最后，补充三点大家可能不会注意的地方：

### constructor

首先是 constructor 属性，我们看个例子：

```js
function Person() {}
var person = new Person()
console.log(person.constructor === Person) // true
```

当获取 person.constructor 时，其实 person 中并没有 constructor 属性,当不能读取到 constructor 属性时，会从 person 的原型也就是 Person.prototype 中读取，正好原型中有该属性，所以：

```js
person.constructor === Person.prototype.constructor
```

### **proto**

其次是 **proto** ，绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 Person.prototype 中，实际上，它是来自于 Object.prototype ，与其说是一个属性，不如说是一个 getter/setter，当使用 obj.**proto** 时，可以理解成返回了 `Object.getPrototypeOf`(obj)。

### 真的是继承吗？

最后是关于继承，前面我们讲到“每一个对象都会从原型‘继承’属性”，实际上，继承是一个十分具有迷惑性的说法，引用《你不知道的 JavaScript》中的话，就是：

继承意味着复制操作，然而 JavaScript 默认并不会复制对象的属性，相反，JavaScript 只是在两个对象之间创建一个关联，这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，委托的说法反而更准确些。

![原型构造图](/src/assets/image/深入系列/原型构造图.png)
