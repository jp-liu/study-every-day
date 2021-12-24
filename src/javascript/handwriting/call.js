// 1.初版实现
// eslint-disable-next-line no-extend-native
Function.prototype.myCall = function (ctx) {
  // 1.收集`this`
  ctx = Object(ctx) || globalThis

  // 2.创建唯一标识,并调用
  const fn = Symbol('fn')
  ctx[fn] = this
  ctx[fn]()
  delete ctx[fn]
}

const foo = {
  value: 1
}

function bar() {
  console.log(this.value)
}

bar.myCall(foo)

// 2.获取函数参数
// eslint-disable-next-line no-extend-native
Function.prototype.myCall = function (ctx, ...args) {
  // 1.收集`this`
  ctx = Object(ctx) || globalThis

  // 2.创建唯一标识,并调用
  const fn = Symbol('fn')
  ctx[fn] = this
  const result = ctx[fn](...args)
  delete ctx[fn]

  return result
}

function bar1(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value)
}

bar1.call(foo, 'kevin', 18)
