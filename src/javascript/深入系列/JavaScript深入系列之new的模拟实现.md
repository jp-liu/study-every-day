# new 的模拟实现

一句话介绍 new:

> new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一

new 的执行逻辑是什么呢 ?

可以总结为一下几步

1. 创建一个空对象
2. 将对象的原型指向构造函数的原型
3. 将构造函数的 this 指向新对象
4. 执行后续代码, 为对象添加属性和方法
5. 将创建对象返回

因为 new 是关键字，所以无法像 bind 函数一样直接覆盖，所以我们写一个函数，命名为 objectFactory，来模拟 new 的效果。用的时候是这样的：

```js
function Person() {
    ……
}

// 使用 new
var person = new Person(……);
// 使用 objectFactory
var person = objectFactory(Person, ……)
```

## 具体实现

结合以上总结的几点, 我们可以比较轻松的实现对应的代码,如下

```js
/**
 * @description 模拟实现`new`关键字
 * @param {Function} Constructor 构造函数
 * @param  {...any} params 实例参数
 */
function objectFactory(Constructor, ...params) {
  // 1.创建一个空对象
  const obj = new Object()

  // 2.将对象的原型指向构造函数的原型
  obj.__proto__ = Constructor.prototype

  // 3.4.绑定`this`并且执行后续逻辑,添加属性和方法
  Constructor.apply(obj, params)

  // 5.返回实例
  return obj
}

function Person(name) {
  this.name = name
}

const person = objectFactory(Person, '娃哈哈')
console.log(person)
```

我们可以复制一下代码, 在浏览器控制台中坐下测试

```js
function Otaku(name, age) {
  this.name = name
  this.age = age

  this.habit = 'Games'
}

Otaku.prototype.strength = 60

Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name)
}

function objectFactory(Constructor, ...params) {
  // 1.创建一个空对象
  const obj = new Object()

  // 2.将对象的原型指向构造函数的原型
  obj.__proto__ = Constructor.prototype

  // 3.4.绑定`this`并且执行后续逻辑,添加属性和方法
  Constructor.apply(obj, params)

  // 5.返回实例
  return obj
}

var person1 = objectFactory(Otaku, 'Kevin', '18')

console.log(person1.name) // Kevin
console.log(person1.habit) // Games
console.log(person1.strength) // 60

person1.sayYourName() // I am Kevin
```

## 返回值效果实现

接下来我们再来看一种情况，假如构造函数有返回值，举个例子：

```js
function Otaku(name, age) {
  this.strength = 60
  this.age = age

  return {
    name: name,
    habit: 'Games'
  }
}

var person = new Otaku('Kevin', '18')

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined
```

在这个例子中，构造函数返回了一个对象，在实例 person 中只能访问返回的对象中的属性。

而且还要注意一点，在这里我们是返回了一个对象，假如我们只是返回一个基本类型的值呢？

再举个例子：

```js
function Otaku(name, age) {
  this.strength = 60
  this.age = age

  return 'handsome boy'
}

var person = new Otaku('Kevin', '18')

console.log(person.name) // undefined
console.log(person.habit) // undefined
console.log(person.strength) // 60
console.log(person.age) // 18
```

结果完全颠倒过来，这次尽管有返回值，但是相当于没有返回值进行处理。

所以我们还需要判断返回的值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么。

再来看第二版的代码，也是最后一版的代码：

```js
/**
 * @description 模拟实现`new`关键字
 * @param {Function} Constructor 构造函数
 * @param  {...any} params 实例参数
 */
function objectFactory(Constructor, ...params) {
  // 1.创建一个空对象
  const obj = new Object()

  // 2.将对象的原型指向构造函数的原型
  obj.__proto__ = Constructor.prototype

  // 3.4.绑定`this`并且执行后续逻辑,添加属性和方法
  const res = Constructor.apply(obj, params)

  // 5.判断构造函数是否返回对象
  return typeof res === 'object' ? res : obj
}
```
