// eslint-disable-next-line no-unused-vars
function debounce(fn, wait) {
  let timeout
  return function (...args) {
    const ctx = this

    clearTimeout(timeout)
    timeout = setTimeout(function () {
      fn.apply(ctx, args)
    }, wait)
  }
}
