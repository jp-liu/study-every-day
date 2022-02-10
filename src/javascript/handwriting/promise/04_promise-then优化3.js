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
    // 链式调用
    return new LPromise((resolve, reject) => {
      const handlerError = currying(execFnWithError)(_, _, resolve, reject)

      // 延迟的`then`需要支持调用
      if (this.state === PROMISE_STATE_FULFILLED && onFulfilled) {
        handlerError(onFulfilled, this.value)
      }

      if (this.state === PROMISE_STATE_REJECTED && onRejected) {
        handlerError(onRejected, this.reason)
      }

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
  reject(456)
})

p.then(
  res => {
    console.log(res)
  },
  reason => {
    console.log(reason)
  }
).then(
  res => {
    console.log(res)
  },
  reason => {
    console.log(reason)
  }
)
