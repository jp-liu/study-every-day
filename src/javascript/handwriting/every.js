// `every` 是当数组所有项都满足回调条件时,则为`true`
// eslint-disable-next-line no-extend-native
Array.prototype.myEvery = function (callbackFn) {
  // 1.获取数组本身/判断`this`
  const _arr = this
  const thisArg = arguments[1] || window

  // 开始标识值为true
  // 遇到回调返回false，直接返回false
  // 如果循环执行完毕，意味着所有回调返回值为true，最终结果为true
  const flag = true
  for (let i = 0; i < _arr.length; i++) {
    // 回调函数执行为false，函数中断
    if (!callbackFn.call(thisArg, _arr[i], i, _arr)) {
      return false
    }
  }
  return flag
}
