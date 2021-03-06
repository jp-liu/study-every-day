const { _, currying } = require('../curry')

class MyPromise {
  // 为了统一用static创建静态属性，用来管理状态
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'

  // 构造函数：通过new命令生成对象实例时，自动调用类的构造函数
  constructor(executor) {
    // 给类的构造方法constructor添加一个参数func
    this.PromiseState = MyPromise.PENDING // 指定Promise对象的状态属性 PromiseState，初始值为pending
    this.PromiseResult = null // 指定Promise对象的结果 PromiseResult
    this.onFulfilledCallbacks = [] // 保存成功回调
    this.onRejectedCallbacks = [] // 保存失败回调

    const resolve = value => {
      // result为成功态时接收的终值
      // 只能由pending状态 => fulfilled状态 (避免调用多次resolve reject)
      // 状态变化只能在宏/微任务中执行,如果在外面直接执行,then的时候,就会直接执行回调
      if (this.PromiseState === MyPromise.PENDING) {
        /**
         * 为什么resolve和reject要加queueMicrotask?
         * 2.2.4规范 onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行.
         * 注1 这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
         * 这个事件队列可以采用“宏任务（macro-task）”机制，比如queueMicrotask 或者 setImmediate； 也可以采用“微任务（micro-task）”机制来实现， 比如 MutationObserver 或者process.nextTick。
         */
        queueMicrotask(() => {
          if (this.PromiseState !== MyPromise.PENDING) return
          /**
           * 在执行resolve或者reject的时候，遍历自身的callbacks数组，
           * 看看数组里面有没有then那边 保留 过来的 待执行函数，
           * 然后逐个执行数组里面的函数，执行的时候会传入相应的参数
           */
          this.PromiseResult = value
          this.PromiseState = MyPromise.FULFILLED
          this.onFulfilledCallbacks.forEach(callback => {
            callback()
          })
        })
      }
    }

    const reject = reason => {
      // reason为拒绝态时接收的终值
      // 只能由pending状态 => rejected状态 (避免调用多次resolve reject)
      // 状态变化只能在宏/微任务中执行,如果在外面直接执行,then的时候,就会直接执行回调
      if (this.PromiseState === MyPromise.PENDING) {
        queueMicrotask(() => {
          if (this.PromiseState !== MyPromise.PENDING) return
          this.PromiseResult = reason
          this.PromiseState = MyPromise.REJECTED
          this.onRejectedCallbacks.forEach(callback => {
            callback()
          })
        })
      }
    }

    try {
      /**
       * executor()传入resolve和reject，
       * resolve()和reject()方法在外部调用，这里需要用bind修正一下this指向
       * new 对象实例时，自动执行func()
       */
      executor(resolve, reject)
    } catch (error) {
      // 生成实例时(执行resolve和reject)，如果报错，就把错误信息传入给reject()方法，并且直接执行reject()方法
      this.reject(error)
    }
  }

  /**
   * [注册fulfilled状态/rejected状态对应的回调函数
   * @param { (value:any) } onFulfilled  fulfilled状态时 执行的函数
   * @param { (reason:any)} onRejected   rejected状态时 执行的函数
   * @returns { MyPromise } newPromise   返回一个新的promise对象
   */
  then(onFulfilled, onRejected) {
    /**
     * 参数校验：Promise规定then方法里面的两个参数如果不是函数的话就要被忽略
     * 所谓“忽略”并不是什么都不干，
     * 对于onFulfilled来说“忽略”就是将value原封不动的返回，
     * 对于onRejected来说就是返回reason，
     *     onRejected因为是错误分支，我们返回reason应该throw一个Error
     */
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw reason
          }

    let resolve = null
    let reject = null
    // 2.2.7规范 then 方法必须返回一个 promise 对象
    const promise2 = new MyPromise((a, b) => {
      resolve = a
      reject = b
    })

    const handleError = currying(execFnWithError)(
      _,
      this.PromiseResult,
      promise2,
      resolve,
      reject
    )

    if (this.PromiseState === MyPromise.FULFILLED) {
      handleError(onFulfilled)
    } else if (this.PromiseState === MyPromise.REJECTED) {
      handleError(onRejected)
    } else if (this.PromiseState === MyPromise.PENDING) {
      // pending 状态保存的 resolve() 和 reject() 回调也要符合 2.2.7.1 和 2.2.7.2 规范
      this.onFulfilledCallbacks.push(() => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.PromiseResult)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
      this.onRejectedCallbacks.push(() => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.PromiseResult)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }

    return promise2
  }
}
function execFnWithError(fn, value, p, resolve, reject) {
  queueMicrotask(() => {
    try {
      const x = fn(value)
      resolvePromise(p, x, resolve, reject)
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * 对resolve()、reject() 进行改造增强 针对resolve()和reject()中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled或onRejected的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
  // 2.3.1规范 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }

  // 2.3.2规范 如果 x 为 Promise ，则使 promise2 接受 x 的状态
  if (x instanceof MyPromise) {
    if (x.PromiseState === MyPromise.PENDING) {
      /**
       * 2.3.2.1 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
       *         注意"直至 x 被执行或拒绝"这句话，
       *         这句话的意思是：x 被执行x，如果执行的时候拿到一个y，还要继续解析y
       */
      x.then(y => {
        resolvePromise(promise2, y, resolve, reject)
      }, reject)
    } else if (x.PromiseState === MyPromise.FULFILLED) {
      // 2.3.2.2 如果 x 处于执行态，用相同的值执行 promise
      resolve(x.PromiseResult)
    } else if (x.PromiseState === MyPromise.REJECTED) {
      // 2.3.2.3 如果 x 处于拒绝态，用相同的据因拒绝 promise
      reject(x.PromiseResult)
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
            resolvePromise(promise2, y, resolve, reject)
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

MyPromise.deferred = function () {
  const result = {}
  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

const p = new MyPromise((resolve, reject) => {
  resolve(123)
  resolve(312)
  resolve(2222)
  resolve(3333)
  resolve(1111123)
  resolve(123)
  reject(456)
})

p.then(
  res => {
    console.log('res=>>>>', res)
  },
  reason => {
    console.log('err->>>', reason)
  }
).then(
  res => {
    console.log('res=>>>>', res)
  },
  reason => {
    console.log('err->>>', reason)
  }
)

module.exports = MyPromise
