// eslint-disable-next-line no-extend-native
Array.prototype.myMap = function (callbackFn) {
  const _arr = this
  const thisArg = arguments[1] || window
  const res = []
  for (let i = 0; i < _arr.length; i++) {
    res.push(callbackFn.call(thisArg, _arr[i], i, _arr))
  }
  return res
}
