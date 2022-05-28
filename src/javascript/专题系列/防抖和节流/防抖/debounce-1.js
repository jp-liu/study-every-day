// eslint-disable-next-line no-unused-vars
function debounce(fn, wait) {
  let timeout
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(fn, wait)
  }
}
