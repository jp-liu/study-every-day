// eslint-disable-next-line no-unused-vars
function throttle(fn, interval) {
  let prev = 0

  return function (...args) {
    const ctx = this
    const now = Date.now()
    // 现在的时间减去上一次时间,大于执行间隔
    /**
     * p: 上次执行时间  n: 现在时间  w: 间隔
     *   p       n
     * ------------------------------   时间线
     *   n-p > w 说明已经过去了 w+ 的时间,是需要执行的状态
     */
    if (now - prev > interval) {
      fn.apply(ctx, args)
      prev = now
    }
  }
}
