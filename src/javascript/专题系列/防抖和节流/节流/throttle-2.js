// eslint-disable-next-line no-unused-vars
function throttle(fn, interval) {
  let timeout

  return function (...args) {
    const ctx = this

    // 存在计时器说明有任务,则等执行完毕后在触发
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        fn.apply(ctx, args)
      }, interval)
    }
  }
}
