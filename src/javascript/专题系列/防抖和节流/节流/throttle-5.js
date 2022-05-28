// eslint-disable-next-line no-unused-vars
function throttle(fn, interval, options = {}) {
  let timeout, ctx, args
  let prev = 0
  const {
    leading = true, // 立即执行
    trailing = true // 需要尾调用
  } = options

  const later = () => {
    prev = leading ? Date.now() : 0
    timeout = null
    fn.apply(ctx, args)
    if (!timeout) ctx = args = null
  }

  function throttled(...reset) {
    ctx = this
    args = reset
    const now = Date.now()
    // 不需要立即执行,那么prev第一次为0,必然会走执行,修正这个缺点
    // 这样 now - prev 就是 0, 我们需要等待 interval 后,才会执行
    if (!prev && !leading) prev = now
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
      // 避免修改系统时间,触发新的计时器,执行的时候没有上下文信息
      if (!timeout) ctx = args = null
    } else if (trailing && !timeout) {
      timeout = setTimeout(later, remaining)
    }
  }

  throttled.cancel = function () {
    clearTimeout(timeout)
    prev = 0 // 取消后,需要初始化值
    timeout = null
  }

  return throttled
}
