// eslint-disable-next-line no-unused-vars
function debounce(fn, wait, immediate) {
  let timeout, result
  function debounced(...args) {
    const ctx = this

    timeout && clearTimeout(timeout)

    if (immediate) {
      // 如果已经执行过,则不需要继续执行了
      const callNow = !timeout // 执行过说明有值,则为false
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) result = fn.apply(ctx, args)
    } else {
      timeout = setTimeout(function () {
        fn.apply(ctx, args)
      }, wait)
    }
    return result
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}
