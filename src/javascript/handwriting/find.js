'use strict'
// eslint-disable-next-line no-extend-native
Array.prototype.myFind = function (callback) {
  // 1.获取数组本身
  const _this = this

  // 2.这个方法第二个参数可以指定调用的`this`
  const thisArg = arguments[1] || window

  // 3.执行回调函数
  for (let i = 0; i < _this.length; i++) {
    if (callback.call(thisArg, _this[i], i, _this)) {
      return _this[i]
    }
  }

  return undefined
}

const arr = [1, 2, 3, 4, 5, 6]
const res = arr.myFind(function (item) {
  return item === 3
})
console.log(res)
