const LPromise = require('../promise')

/**
 * 对resolve()、reject() 进行改造增强 针对resolve()和reject()中不同值情况 进行处理
 * @param  { LPromise } promise2 promise1.then方法返回的新的promise对象
 * @param  { any } x          promise1中onFulfilled或onRejected的返回值
 * @param  { (value: any) => any } resolve    promise2的resolve方法
 * @param  { (reason: any) => any } reject     promise2的reject方法
 */
module.exports = function inspectParams(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  console.log(x, LPromise, '==================')
  if (x instanceof LPromise) {
    if (x.PromiseState === 'pending') {
      x.then(y => inspectParams(promise2, y, resolve, reject), reject)
    } else {
      resolve(x.PromiseResult)
    }
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 2.3.3 如果 x 为对象或函数
    try {
      // 2.3.3.1 把 x.then 赋值给 then
      var then = x.then
    } catch (e) {
      // 2.3.3.2 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
      return reject(e)
    }

    /**
     * 2.3.3.3
     * 如果 then 是函数，将 x 作为函数的作用域 this 调用之。
     * 传递两个回调函数作为参数，
     * 第一个参数叫做 `resolvePromise` ，第二个参数叫做 `rejectPromise`
     */
    if (typeof then === 'function') {
      // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
      let called = false // 避免多次调用
      try {
        then.call(
          x,
          // 2.3.3.3.1 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          y => {
            if (called) return
            called = true
            inspectParams(promise2, y, resolve, reject)
          },
          // 2.3.3.3.2 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          r => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } catch (e) {
        /**
         * 2.3.3.3.4 如果调用 then 方法抛出了异常 e
         * 2.3.3.3.4.1 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
         */
        if (called) return
        called = true

        /**
         * 2.3.3.3.4.2 否则以 e 为据因拒绝 promise
         */
        reject(e)
      }
    } else {
      // 2.3.3.4 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x)
    }
  } else {
    // 2.3.4 如果 x 不为对象或者函数，以 x 为参数执行 promise
    return resolve(x)
  }
}
