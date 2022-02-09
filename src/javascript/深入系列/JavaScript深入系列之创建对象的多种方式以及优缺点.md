# 创建对象的多种方式以及优缺点

## 写在前面

这篇文章讲解创建对象的各种方式，以及优缺点。

但是注意：

这篇文章更像是笔记，因为《JavaScript 高级程序设计》写得真是太好了！

## 1. 工厂模式

```js
function createPerson(name) {
  var o = new Object()
  o.name = name
  o.getName = function () {
    console.log(this.name)
  }

  return o
}

var person1 = createPerson('kevin')
```

缺点：对象无法识别，因为所有的实例都指向一个原型

## 2. 构造函数模式

```js
function Person(name) {
  this.name = name
  this.getName = function () {
    console.log(this.name)
  }
}

var person1 = new Person('kevin')
```

优点：实例可以识别为一个特定的类型

缺点：每次创建实例时，都要为每个对象创建每个方法都要被创建一次

## 2.1 构造函数模式优化

```js
function Person(name) {
  this.name = name
  this.getName = getName
}

function getName() {
  console.log(this.name)
}

var person1 = new Person('kevin')
```

优点：解决了每个方法都要被重新创建的问题

缺点：这叫啥封装……

## 3. 原型模式

```js
function Person(name) {
  this.name = name
}

Person.prototype.age = 18
Person.prototype.getName = function () {
  console.log(this.name)
}

var person1 = new Person('aaa')
```

优点：方法不会重新创建

缺点：1. 所有的属性和方法都共享, 修改一个,所有实例都改变了

## 3.1 原型模式优化

```js
function Person(name) {}

Person.prototype = {
  constructor: Person,
  name: 'kevin',
  getName: function () {
    console.log(this.name)
  }
}

var person1 = new Person()
```

优点：实例可以通过 constructor 属性找到所属构造函数

缺点：原型模式该有的缺点还是有

## 4. 组合模式

构造函数模式与原型模式双剑合璧。

```js
function Person(name) {
  this.name = name
}

Person.prototype = {
  constructor: Person,
  getName: function () {
    console.log(this.name)
  }
}

var person1 = new Person()
```

优点：该共享的共享，该私有的私有，使用最广泛的方式

缺点：有的人就是希望全部都写在一起，即更好的封装性

## 4.1 动态原型模式

```js
function Person(name) {
  this.name = name
  if (typeof this.getName != 'function') {
    Person.prototype.getName = function () {
      console.log(this.name)
    }
  }
}

var person1 = new Person()
```

注意：使用动态原型模式时，不能用对象字面量重写原型

解释下为什么：

```js
function Person(name) {
  this.name = name
  if (typeof this.getName != 'function') {
    Person.prototype = {
      constructor: Person,
      getName: function () {
        console.log(this.name)
      }
    }
  }
}

var person1 = new Person('kevin')
var person2 = new Person('daisy')

// 报错 并没有该方法
person1.getName()

// 注释掉上面的代码，这句是可以执行的。
person2.getName()
```

为了解释这个问题，假设开始执行 `var person1 = new Person('kevin')`。

如果对 new 和 apply 的底层执行过程不是很熟悉，可以阅读底部相关链接中的文章。

我们回顾下 new 的实现步骤：

1. 首先新建一个对象

2. 然后将对象的原型指向 Person.prototype

   > 第一次创建的时候,新创建的对象原型是指向了之前的原型,

3. 然后 Person.apply(obj)

   > 在这里才真正调用了函数,为对象添加属性和方法, 原型变更在这里

4. 返回这个对象

注意这个时候，回顾下 apply 的实现步骤，会执行 obj.Person 方法，这个时候就会执行 if 语句里的内容，注意实例的原型指向原先构造函数的 prototype 属性，使用字面量方式直接覆盖 Person.prototype，并不会更改实例的原型的值，person1 依然是指向了以前的原型，而不是 Person.prototype。而之前的原型是没有 getName 方法的，所以就报错了！

如果你就是想用字面量方式写代码，可以尝试下这种：

```js
function Person(name) {
  this.name = name
  if (typeof this.getName != 'function') {
    Person.prototype = {
      constructor: Person,
      getName: function () {
        console.log(this.name)
      }
    }

    return new Person(name)
  }
}

var person1 = new Person('kevin')
var person2 = new Person('daisy')

person1.getName() // kevin
person2.getName() // daisy
```

### 5.1 寄生构造函数模式

```js
function Person(name) {
  var o = new Object()
  o.name = name
  o.getName = function () {
    console.log(this.name)
  }

  return o
}

var person1 = new Person('kevin')
console.log(person1 instanceof Person) // false
console.log(person1 instanceof Object) // true
```

寄生构造函数模式，我个人认为应该这样读：

寄生-构造函数-模式，也就是说寄生在构造函数的一种方法。

也就是说打着构造函数的幌子挂羊头卖狗肉，你看创建的实例使用 instanceof 都无法指向构造函数！

这样方法可以在特殊情况下使用。比如我们想创建一个具有额外方法的特殊数组，但是又不想直接修改 Array 构造函数，我们可以这样写：

```js
function SpecialArray() {
  var values = new Array()

  for (var i = 0, len = arguments.length; i < len; i++) {
    values.push(arguments[i])
  }

  values.toPipedString = function () {
    return this.join('|')
  }
  return values
}

var colors = new SpecialArray('red', 'blue', 'green')
var colors2 = SpecialArray('red2', 'blue2', 'green2')

console.log(colors)
console.log(colors.toPipedString()) // red|blue|green

console.log(colors2)
console.log(colors2.toPipedString()) // red2|blue2|green2
```

你会发现，其实所谓的寄生构造函数模式就是比工厂模式在创建对象的时候，多使用了一个 new，实际上两者的结果是一样的。

但是作者可能是希望能像使用普通 Array 一样使用 SpecialArray，虽然把 SpecialArray 当成函数也一样能用，但是这并不是作者的本意，也变得不优雅。

在可以使用其他模式的情况下，不要使用这种模式。

但是值得一提的是，上面例子中的循环：

```js
for (var i = 0, len = arguments.length; i < len; i++) {
  values.push(arguments[i])
}
```

可以替换成：

```js
values.push.apply(values, arguments)
```

## 5.2 稳妥构造函数模式

```js
function person(name) {
  var o = new Object()
  o.sayName = function () {
    console.log(name)
  }
  return o
}

var person1 = person('kevin')

person1.sayName() // kevin

person1.name = 'daisy'

person1.sayName() // kevin

console.log(person1.name) // daisy
```

所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 this 的对象。

与寄生构造函数模式有两点不同：

1. 新创建的实例方法不引用 this
2. 不使用 new 操作符调用构造函数

稳妥对象最适合在一些安全的环境中。

稳妥构造函数模式也跟工厂模式一样，无法识别对象所属类型。
