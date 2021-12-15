// eslint-disable-next-line no-extend-native
Function.prototype.myApply = function (ctx, arr) {
  if (arr && !Array.isArray(arr))
    throw TypeError('arguments arr should be a array')

  // 1.收集`this`
  ctx = Object(ctx) || globalThis

  // 2.创建唯一标识,并调用
  const fn = Symbol('fn')
  ctx[fn] = this

  // 3.获取返回值
  let result
  if (arr) {
    result = ctx[fn](...arr)
  } else {
    result = ctx[fn]()
  }
  delete ctx[fn]

  return result
}

const foo = {
  value: 1
}

function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value)
}

bar.myApply(foo, [123, 'wahaha'])
