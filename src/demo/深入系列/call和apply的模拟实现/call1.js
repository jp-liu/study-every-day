// @ts-nocheck
Function.prototype.jpCall = function (context) {
  // 1.获取调用的函数
  const fn = this

  // 2.绑定对象属性
  const symbol = Symbol('fn')
  context[symbol] = fn

  // 3.调用函数
  context[symbol]()

  // 4.删除属性
  delete context[symbol]
}

// 测试一下
const foo = {
  value: 1
}

function bar() {
  console.log(this.value)
}

bar.jpCall(foo) // 1
