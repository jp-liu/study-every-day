// @ts-nocheck
// 第三版, 判断 new 调用情况,优化,避免修改原函数的原型
Function.prototype.jpBind = function (context, ...args) {
  // 1.this 异常判断
  context = context ? Object(context) : globalThis

  // 2.获取调用的函数
  const self = this

  // 3.创建中转函数
  function Noop() {}

  function bindCtr(...arr) {
    // 判断是否 new 调用,如果是创建实例
    // 则 this 会指向通过构造函数创建的对象
    return self.apply(this instanceof bindCtr ? this : context, [
      ...args,
      ...arr
    ])
  }

  // 3.中转
  Noop.prototype = this.prototype

  // 4.保持原有原型链不变,避免变更
  bindCtr.prototype = new Noop()

  return bindCtr
}

// eslint-disable-next-line no-unused-vars
var value = 2

var foo = {
  value: 1
}

function bar(name, age) {
  this.habit = 'shopping'
  console.log(this.value)
  console.log(name)
  console.log(age)
}

bar.prototype.friend = 'kevin'

var BindFoo = bar.bind(foo, 'daisy')

var obj = new BindFoo('18')
// undefined
// daisy
// 18
console.log(obj.habit)
console.log(obj.friend)
// shopping
// kevin
