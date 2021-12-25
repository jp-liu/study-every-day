// eslint-disable-next-line no-extend-native
Array.prototype.myFilter = function (callbackFn) {
  // 1.获取数组本身
  const _arr = this

  // 2.获取回调函数的`this`
  const thisArg = Object(arguments[1]) || window

  // 3.遍历执行
  const res = []
  for (let i = 0; i < _arr.length; i++) {
    if (callbackFn.call(thisArg, _arr[i], i, _arr)) {
      res.push(_arr[i])
    }
  }
  return res
}

const testA = [{ value: 1 }, { value: 1 }, { value: 2 }]
const testRes = testA.myFilter(item => item.value === 1)
console.log(testRes)
