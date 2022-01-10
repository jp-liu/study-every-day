# this 指向问题

> 先从基本记录一下 `this` 的指向,后面在 `深入系列` 中, 会从规范触发,解读,为什么会是这样的结果

在 `js` 中,有一个疑惑的点 `this`, 它的指向问题,存在各种各样的,来看一下,它是如何绑定指向的吧

1. 函数在调用时，`JavaScript` 会默认给 this 绑定一个值
2. `this` 的绑定和定义的位置（编写的位置）没有关系
3. `this` 的绑定和调用方式以及调用的位置有关系
4. `this` 实在运行时,动态绑定的

## `this` 绑定规则

### 1.默认绑定

> 注意: 严格模式下默认 `this` 为 `undefined` ,非严格模式下才是 `window`

作为独立函数调用时,采用的默认绑定规则

```js
function foo() {
  console.log(this) // window
}

function test1() {
  console.log(this) // window
  test2()
}
function test2() {
  console.log(this) // window
  test3()
}
function test3() {
  console.log(this) // window
}

test1()

function fn(fnc) {
  fnc()
}

var obj = {
  bar: function () {
    console.log(this)
  }
}

fn(obj.bar) // window 因为`obj.bar`取出的是函数,函数再被独立执行的
```

### 2.隐式绑定

作为对象方法调用时,采用隐式绑定规则

```js
function foo() {
  console.log(this)
}

var obj = {
  bar: foo
}
obj.bar() // obj

var obj1 = {
  bar: foo
}
var obj2 = {
  obj1: obj1
}
obj2.obj1.bar() // obj1

var obj3 = {
  foo: foo
}
var bar = obj1.foo
// 取出函数,独立调用了
bar() // window
```

### 3.显示绑定

使用 `call、apply、bind` 进行绑定

```js
function foo() {
  console.log(this)
}

// bind
var obj = {
  name: 'jpliu'
}
var bar = foo.bind(obj)
bar() // obj

// call/apply
foo.call(window) // window
foo.call({ name: 'jpliu' }) // {name: 'jpliu'}
foo.call(123) // Number对象的123     Number {123}
foo.apply('123') // String 对象的'123'  String {'123'}
```

### 4.new 绑定

通过 `new` 关键字实例化对象的时候,绑定为实例化的对象

```js
function Person(name) {
  console.log(this) // Person {}
  this.name = name // Person { name: 'jpliu' }
}
var p = new Person('jpliu')
console.log(p)
```

### 5.内置方法

```js
// 其实算是隐式绑定,因为这些方法都是 `window`的
window.setTimeout(function () {
  console.log(this) // window
}, 2000)

// 2.监听点击
const boxDiv = document.querySelector('.box')
// 隐式绑定 `boxDiv` 的`onclick` 方法触发
boxDiv.onclick = function () {
  console.log(this)
}
// `addEventListener`的`this`是隐式绑定
// 当`callback`的`this`没有显示绑定时
// 使用`bind`显示绑定`addEventListener`的`this`
boxDiv.addEventListener('click', function () {
  console.log(this)
})
boxDiv.addEventListener('click', function () {
  console.log(this)
})
boxDiv.addEventListener('click', function () {
  console.log(this)
})

// 3.数组.forEach/map/filter/find
var names = ['abc', 'cba', 'nba']
names.forEach(function (item) {
  console.log(item, this)
}, 'abc')
names.map(function (item) {
  console.log(item, this)
}, 'cba')
```

### 6.规则优先级

1. 默认规则的优先级最低

2. 显示绑定优先级高于隐式绑定

   ```js
   function foo() {
     console.log(this)
   }

   var obj = {
     name: 'obj',
     foo: foo.bind('aaa')
   }

   // [String: 'aaa']
   obj.foo()
   ```

3. new 绑定优先级高于隐式绑定

   ```js
   var obj = {
     name: 'obj',
     foo: function () {
       console.log(this)
     }
   }

   // new的优先级高于隐式绑定
   // foo {}
   var f = new obj.foo()
   ```

4. new 绑定优先级高于 bind

   - new 绑定和 call、apply 是不允许同时使用的，所以不存在谁的优先级更高

   - new 绑定可以和 bind 一起使用，new 绑定优先级更高

     ```js
     function foo() {
       console.log(this)
     }

     var bar = foo.bind('aaa')

     // foo {} 不是 [String: 'aaa']
     var obj = new bar()
     ```

### 7.规则之外

1. `null` 或者 `undefined`

   ```js
   // 非严格模式下
   // apply/call/bind: 当传入null/undefined时, 自动将this绑定成全局对象
   foo.apply(null)
   foo.apply(undefined)

   var bar = foo.bind(null)
   bar()

   // 严格模式下,就是 `null/undefined`
   ```

2. 间接函数引用

   ```js
   var obj1 = {
     name: 'obj1',
     foo: function () {
       console.log(this)
     }
   }

   var obj2 = {
     name: 'obj2'
   }

   // 这里是取出了obj1.foo函数,赋值给了obj2.bar
   // = 运算法的返回值,就是右侧的值, ob1.foo 的函数定义
   // 相当于取出函数,然后独立调用, 所以指向 window
   ;(obj2.bar = obj1.foo)()
   ```

3. 箭头函数,箭头函数是无法使用 `bind/call/apply` 绑定 `this` 的,箭头函数的 `this` 是定义的时候所处的上下文环境,无法变更,属于静态 `this`, 而不是动态绑定的

### 8.实践

```js
var name = 'window'

var person = {
  name: 'person',
  sayName: function () {
    console.log(this.name)
  }
}

function sayName() {
  var sss = person.sayName
  sss() // window: 独立函数调用
  person.sayName() // person: 隐式调用
  person.sayName() // person: 隐式调用
  ;(b = person.sayName)() // window: 赋值表达式(独立函数调用)
}

sayName()
```

```js
var name = 'window'

var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    return () => {
      console.log(this.name)
    }
  }
}

var person2 = { name: 'person2' }

// person1.foo1(); // person1(隐式绑定)
// person1.foo1.call(person2); // person2(显示绑定优先级大于隐式绑定)

// person1.foo2(); // window(不绑定作用域,上层作用域是全局)
// person1.foo2.call(person2); // window

// person1.foo3()(); // window(独立函数调用)
// person1.foo3.call(person2)(); // window(独立函数调用)
// person1.foo3().call(person2); // person2(最终调用返回函数式, 使用的是显示绑定)

// person1.foo4()(); // person1(箭头函数不绑定this, 上层作用域this是person1)
// person1.foo4.call(person2)(); // person2(上层作用域被显示的绑定了一个person2)
// person1.foo4().call(person2); // person1(上层找到person1)
```

```js
var name = 'window'

function Person(name) {
  this.name = name
  ;(this.foo1 = function () {
    console.log(this.name)
  }),
    (this.foo2 = () => console.log(this.name)),
    (this.foo3 = function () {
      return function () {
        console.log(this.name)
      }
    }),
    (this.foo4 = function () {
      return () => {
        console.log(this.name)
      }
    })
}

var person1 = new Person('person1')
var person2 = new Person('person2')

person1.foo1() // person1
person1.foo1.call(person2) // person2(显示高于隐式绑定)

person1.foo2() // person1 (上层作用域中的this是person1)
person1.foo2.call(person2) // person1 (上层作用域中的this是person1)

person1.foo3()() // window(独立函数调用)
person1.foo3.call(person2)() // window
person1.foo3().call(person2) // person2

person1.foo4()() // person1
person1.foo4.call(person2)() // person2
person1.foo4().call(person2) // person1
```

```js
var name = 'window'

function Person(name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}

var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()() // window
person1.obj.foo1.call(person2)() // window
person1.obj.foo1().call(person2) // person2

person1.obj.foo2()() // obj
person1.obj.foo2.call(person2)() // person2
person1.obj.foo2().call(person2) // obj
```
