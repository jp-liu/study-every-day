const PROMISE_STATE_PENDING = 'pending'
const PROMISE_STATE_FULFILLED = 'fulfilled'
const PROMISE_STATE_REJECTED = 'rejected'

/**
 * @description 手写`Promise`
 */
class LPromise {
  constructor(executor) {
    this.state = PROMISE_STATE_PENDING

    const resolve = value => {
      if (this.state !== PROMISE_STATE_PENDING) return
      this.value = value
      this.state = PROMISE_STATE_FULFILLED
      queueMicrotask(() => {
        this.fulfilled(this.value)
      })
    }
    const reject = reason => {
      if (this.state !== PROMISE_STATE_PENDING) return
      this.reason = reason
      this.state = PROMISE_STATE_REJECTED
      queueMicrotask(() => {
        this.rejected(this.reason)
      })
    }

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    this.fulfilled = onFulfilled
    this.rejected = onRejected
  }
}

const p = new LPromise((resolve, reject) => {
  // console.log('立即执行')
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
)
