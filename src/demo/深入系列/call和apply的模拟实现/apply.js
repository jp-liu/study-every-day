// @ts-nocheck
Function.prototype.jpApply = function (context, arr) {
  // this 异常判断
  context = context ? Object(context) : globalThis

  // 1.获取调用的函数, 还有参数
  const fn = this

  // 2.绑定对象属性
  const symbol = Symbol('fn')
  context[symbol] = fn

  // 3.调用函数
  const result = arr ? context[symbol](...arr) : context[symbol]()

  // 4.删除属性
  delete context[symbol]

  // 5.返回值
  return result
}

// 测试一下
// eslint-disable-next-line no-unused-vars
var value = 2

var obj = {
  value: 1
}

function bar(name, age) {
  console.log(this.value)
  return {
    value: this.value,
    name: name,
    age: age
  }
}

bar.jpApply(null) // 2

console.log(bar.jpApply(obj, ['kevin', 18]))
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }
