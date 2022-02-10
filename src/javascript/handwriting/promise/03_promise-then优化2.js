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
        this.fulfilledFns.forEach(fn => fn(this.value))
      })
    }
    const reject = reason => {
      if (this.state !== PROMISE_STATE_PENDING) return
      this.reason = reason
      this.state = PROMISE_STATE_REJECTED
      queueMicrotask(() => {
        this.rejectedFns.forEach(fn => fn(this.reason))
      })
    }

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    return new LPromise((resolve, reject) => {
      // 延迟的`then`需要支持调用
      if (this.state === PROMISE_STATE_FULFILLED && onFulfilled) {
        try {
          const res = onFulfilled(this.value)
          resolve(res)
        } catch (err) {
          reject(err)
        }
      }

      if (this.state === PROMISE_STATE_REJECTED && onRejected) {
        try {
          const res = onRejected(this.reason)
          resolve(res)
        } catch (err) {
          reject(err)
        }
      }

      if (this.state === PROMISE_STATE_PENDING) {
        this.fulfilledFns.push(() => {
          try {
            const res = onFulfilled(this.value)
            resolve(res)
          } catch (err) {
            reject(err)
          }
        })
        this.rejectedFns.push(() => {
          try {
            const res = onRejected(this.reason)
            resolve(res)
          } catch (err) {
            reject(err)
          }
        })
      }
    })
  }
}

const p = new LPromise((resolve, reject) => {
  // console.log('立即执行')
  reject(456)
  resolve(123)
})

p.then(
  res => {
    console.log(res)
  },
  reason => {
    console.log(reason)
  }
)

p.then(
  res => {
    console.log(res)
  },
  reason => {
    console.log(reason)
  }
)

setTimeout(() => {
  p.then(
    res => {
      console.log(res)
    },
    reason => {
      console.log(reason)
    }
  )
}, 1000)
