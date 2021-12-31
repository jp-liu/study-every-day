// `find` 查找数组元素,找到一项满足回调条件,则返回元素,如果不满足,则为`undefined`
// `find` 返回元素, `findIndex` 返回的是下标,所以一个就行了
// eslint-disable-next-line no-extend-native
Array.prototype.myFind = function (callbackFn) {
  // 1.获取数组本身/判断`this`
  const _arr = this
  const thisArg = arguments[1] || window

  // 遇到回调返回true，直接返回该数组元素
  // 如果循环执行完毕，意味着所有回调返回值为false，最终结果为undefined
  for (let i = 0; i < _arr.length; i++) {
    // 回调函数执行为false，函数中断
    if (callbackFn.call(thisArg, _arr[i], i, _arr)) {
      return _arr[i]
    }
  }
  return undefined
}
