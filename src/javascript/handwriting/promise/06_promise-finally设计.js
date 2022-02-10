const { _, currying } = require('../curry')

const PROMISE_STATE_PENDING = 'pending'
const PROMISE_STATE_FULFILLED = 'fulfilled'
const PROMISE_STATE_REJECTED = 'rejected'

/**
 * @description 手写`Promise`
 */
class LPromise {
  constructor(executor) {
    this.state = PROMISE_STATE_PENDING
    this.value = undefined
    this.reason = undefined
    this.fulfilledFns = []
    this.rejectedFns = []

    const resolve = value => {
      if (this.state !== PROMISE_STATE_PENDING) return
      this.value = value
      this.state = PROMISE_STATE_FULFILLED
      queueMicrotask(() => {
        this.fulfilledFns.forEach(fn => fn())
      })
    }
    const reject = reason => {
      if (this.state !== PROMISE_STATE_PENDING) return
      this.reason = reason
      this.state = PROMISE_STATE_REJECTED
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
      const handlerError = currying(execFnWithError)(_, _, resolve, reject)
      const defaultOnFulfilled = value => value
      const defaultOnRejected = reason => {
        throw reason
      }
      onFulfilled = onFulfilled || defaultOnFulfilled
      onRejected = onRejected || defaultOnRejected

      // 2.延迟的`then`需要支持调用
      if (this.state === PROMISE_STATE_FULFILLED) {
        handlerError(onFulfilled, this.value)
      }

      if (this.state === PROMISE_STATE_REJECTED) {
        handlerError(onRejected, this.reason)
      }

      // 3.多组`then`
      if (this.state === PROMISE_STATE_PENDING) {
        this.fulfilledFns.push(() => {
          handlerError(onFulfilled, this.value)
        })
        this.rejectedFns.push(() => {
          handlerError(onRejected, this.reason)
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
}

function execFnWithError(fn, value, resolve, reject) {
  try {
    const res = fn(value)
    resolve(res)
  } catch (err) {
    reject(err)
  }
}

const p = new LPromise((resolve, reject) => {
  resolve(123)
  // reject(456)
})

p.then(res => {
  console.log(res)
  return 123321
})
  .catch(reason => {
    console.log('err:', reason)
    return '123'
  })
  .finally(a => {
    console.log('finally', a)
  })
