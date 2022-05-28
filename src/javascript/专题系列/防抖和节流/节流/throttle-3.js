// eslint-disable-next-line no-unused-vars
function throttle(fn, interval) {
  let timeout, ctx, args
  let prev = 0

  const later = () => {
    prev = Date.now()
    timeout = null
    fn.apply(ctx, args)
  }

  return function (...reset) {
    ctx = this
    args = reset
    const now = Date.now()
    /*
     * p: 上次执行时间  n: 现在时间  i: 间隔
     *   p       n
     * ------------------------------   时间线
     * n-p 是过了多久
     * i-(n-p) 是距离下一次执行,还差多久
     * remaining <= 0 说明距离下一次执行不足 0,是需要执行的状态
     * remaining > i 说明 n-p 是个负数,时间倒退在现实生活中是不可能的,但是如果计算的时间被调整呢?所以这是一个边缘 case
     */
    const remaining = interval - (now - prev)
    if (remaining <= 0 || remaining > interval) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      prev = now
      fn.apply(ctx, args)
    } else if (!timeout) {
      timeout = setTimeout(later, remaining)
    }
  }
}
