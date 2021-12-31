// `some` 是当数组元素中,有一项满足回调条件,则为`true`
// eslint-disable-next-line no-extend-native
Array.prototype.mySome = function (callbackFn) {
  // 1.获取数组本身/判断`this`
  const _arr = this
  const thisArg = arguments[1] || window

  // 开始标识值为false
  // 遇到回调返回true，直接返回true
  // 如果循环执行完毕，意味着所有回调返回值为false，最终结果为false
  const flag = false
  for (let i = 0; i < _arr.length; i++) {
    // 回调函数执行为false，函数中断
    if (callbackFn.call(thisArg, _arr[i], i, _arr)) {
      return true
    }
  }
  return flag
}
