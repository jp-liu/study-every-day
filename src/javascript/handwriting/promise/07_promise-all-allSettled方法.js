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
}

function execFnWithError(fn, value, resolve, reject) {
  try {
    const res = fn(value)
    resolve(res)
  } catch (err) {
    reject(err)
  }
}

const p1 = new LPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(123)
  }, 1000)
})
const p2 = new LPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(456)
  }, 2000)
})
const p3 = new LPromise((resolve, reject) => {
  // resolve(789)
  reject('错误')
})

LPromise.all([p1, p2, p3])
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

LPromise.allSettled([p1, p2, p3])
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
