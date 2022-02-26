// eslint-disable-next-line no-unused-vars
function throttle(func, wait, options) {
  let timeout, context, args
  let previous = 0
  if (!options) options = {}

  const later = function () {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    func.apply(context, args)
    if (!timeout) context = args = null
  }

  const throttled = function () {
    const now = new Date().getTime()

    if (!previous && options.leading === false) previous = now

    const remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing) {
      timeout = setTimeout(later, remaining)
    }
  }

  return throttled
}

function throttle1(fn, interval, options = {}) {
  let timer = null
  let previous = 0
  const {
    leading = false,
    trailing = true,
    resultCallback = undefined
  } = options

  function throttled(...args) {
    // 1.获取现在时间
    const now = new Date().getTime()
    // 2.判断是否立即执行
    if (!previous && !leading) previous = now
    // 3.获取剩余时间
    const remaining = interval - (now - previous)
    // 4.判断是否执行,时间小于0,或者已经过时了
    // 例如,上次是十点一分,现在系统时间变更,成为了九点半,那么 now - previous 小于0
    // 那么 remaining > interval,则应该立即执行
    if (remaining <= 0 || interval < remaining) {
      // 如果存在计时器,执行的时候应该清除
      // 计时器应该是需要触发结尾调用的时候用的,如果已经执行了,说明之前的计时器,失效
      // 要尾调用,应该是触发了新的
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      // 保障,第二次时间范围内,不会在执行
      previous = now
      const result = fn.apply(this, args)
      if (resultCallback) resultCallback(result)
    }
    // 5.是否执行一次尾调用
    else if (!timer && trailing) {
      timer = setTimeout(() => {
        // 不是立即执行,则为 0,说明 interval < Date.now()
        // 立即执行,则为 Date.now(),下一次判断 now - previous 则需要判断是否在上一次周期内,
        // 如果不是,则 `(now - previous) > interval` 立即执行了
        // 如果是,则 `now - previous < interval 不能执行,等待计时器执行完毕
        previous = !leading ? 0 : Date.now()
        timer = null
        const result = fn.apply(this, args)
        if (resultCallback) resultCallback(result)
      }, remaining)
    }
  }

  throttled.cancel = function () {
    clearTimeout(timer)
    timer = null
    previous = 0
  }

  return throttled
}

module.exports.throttle = throttle1
