const { _, currying } = require('../curry')
// const inspectParams = require('./helper/inspectParams')

const PROMISE_STATE_PENDING = 'pending'
const PROMISE_STATE_FULFILLED = 'fulfilled'
const PROMISE_STATE_REJECTED = 'rejected'

/**
 * @description 手写`Promise`
 */
class LPromise {
  constructor(executor) {
    this.PromiseState = PROMISE_STATE_PENDING
    this.PromiseResult = undefined
    this.fulfilledFns = []
    this.rejectedFns = []

    const resolve = value => {
      if (this.PromiseState !== PROMISE_STATE_PENDING) return
      this.PromiseResult = value
      this.PromiseState = PROMISE_STATE_FULFILLED
      queueMicrotask(() => {
        this.fulfilledFns.forEach(fn => fn())
      })
    }
    const reject = reason => {
      if (this.PromiseState !== PROMISE_STATE_PENDING) return
      this.PromiseResult = reason
      this.PromiseState = PROMISE_STATE_REJECTED
      queueMicrotask(() => {
        this.rejectedFns.forEach(fn => fn())
      })
    }

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    // 1,链式调用
    return new LPromise((resolve, reject) => {
      // 1.部分特殊情况处理
      const handlerError = currying(execFnWithError)(
        _,
        _,
        this,
        resolve,
        reject
      )
      const defaultOnFulfilled = value => value
      const defaultOnRejected = reason => {
        throw reason
      }
      onFulfilled = onFulfilled || defaultOnFulfilled
      onRejected = onRejected || defaultOnRejected

      // 2.延迟的`then`需要支持调用
      if (this.PromiseState === PROMISE_STATE_FULFILLED) {
        handlerError(onFulfilled, this.PromiseResult)
      }

      if (this.PromiseState === PROMISE_STATE_REJECTED) {
        handlerError(onRejected, this.PromiseResult)
      }

      // 3.多组`then`
      if (this.PromiseState === PROMISE_STATE_PENDING) {
        this.fulfilledFns.push(() => {
          handlerError(onFulfilled, this.PromiseResult)
        })
        this.rejectedFns.push(() => {
          handlerError(onRejected, this.PromiseResult)
        })
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    return this.then(onFinally, onFinally)
  }

  static resolve(value) {
    return new LPromise(resolve => resolve(value))
  }

  static reject(reason) {
    return new LPromise((_, reject) => reject(reason))
  }

  static all(promises) {
    return new LPromise((resolve, reject) => {
      const ps = []
      for (const promise of promises) {
        promise.then(
          value => {
            ps.push(value)
            if (ps.length === promises.length) {
              resolve(ps)
            }
          },
          reason => {
            reject(reason)
          }
        )
      }
    })
  }

  static allSettled(promises) {
    return new LPromise(resolve => {
      const ps = []
      for (const promise of promises) {
        promise.then(
          value => {
            ps.push({ state: PROMISE_STATE_FULFILLED, value: value })
            if (ps.length === promises.length) {
              resolve(ps)
            }
          },
          reason => {
            ps.push({ state: PROMISE_STATE_REJECTED, value: reason })
            if (ps.length === promises.length) {
              resolve(ps)
            }
          }
        )
      }
    })
  }

  static race(promises) {
    return new LPromise((resolve, reject) => {
      for (const promise of promises) {
        promise.then(resolve, reject)
      }
    })
  }

  static any(promises) {
    return new LPromise(resolve => {
      for (const promise of promises) {
        promise.then(resolve)
      }
    })
  }
}

function execFnWithError(fn, value, p, resolve, reject) {
  try {
    const res = fn(value)
    inspectParams(p, res, resolve, reject)
  } catch (err) {
    reject(err)
  }
}

function inspectParams(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
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

module.exports = LPromise
