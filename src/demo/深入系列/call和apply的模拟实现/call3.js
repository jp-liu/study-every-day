// @ts-nocheck
Function.prototype.jpCall = function (context, ...args) {
  // this 异常判断
  context = context ? Object(context) : globalThis

  // 1.获取调用的函数, 还有参数
  const fn = this

  // 2.绑定对象属性
  const symbol = Symbol('fn')
  context[symbol] = fn

  // 3.调用函数
  const result = context[symbol](...args)

  // 4.删除属性
  delete context[symbol]

  // 5.返回值
  return result
}

// 测试一下
// eslint-disable-next-line no-var
// eslint-disable-next-line no-unused-vars
var value = 2

var obj = {
  value: 1
}

function bar(name, age) {
  // this指定为null, node 运行是 undefined
  // 因为 node 会对文件进行编译包装,为立即执行函数
  // 传入 require, module, exports...
  // 所以指定this之后,当前文件并不是全局,不是通过作用域链访问,
  // 而是原型链,全局上没有, 整个node 环境才是
  console.log(this.value)
  return {
    value: this.value,
    name: name,
    age: age
  }
}

bar.jpCall(null) // 2

console.log(bar.jpCall(obj, 'kevin', 18))
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }
