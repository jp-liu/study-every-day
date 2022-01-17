// @ts-nocheck
Function.prototype.jpCall = function (context, ...args) {
  // 1.获取调用的函数, 还有参数
  const fn = this
  // 1.1 参数获取方式一
  // const args = []
  // for (let i = 1, len = arguments.length; i < len; i++) {
  //   args.push('arguments[' + i + ']')
  // }
  // 1.2 使用 rest 参数 ...args

  // 2.绑定对象属性
  const symbol = Symbol('fn')
  context[symbol] = fn

  // 3.调用函数
  // eval('context[symbol](' + args + ')')
  context[symbol](...args)

  // 4.删除属性
  delete context[symbol]
}

// 测试一下
const foo = {
  value: 1
}

function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value)
}

bar.jpCall(foo, 'kevin', 18)
// kevin
// 18
// 1
