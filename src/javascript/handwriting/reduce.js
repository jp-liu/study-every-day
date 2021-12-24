// eslint-disable-next-line no-extend-native
Array.prototype.myReduce = function (callback, defaultValue) {
  const _arr = this

  // 1.判断是否提供初始值,如果没提供,则将数组第一个元素作为初始值
  let res = defaultValue
  let i = 0
  if (res === undefined) {
    // 如果提供了初始值,可以返回初始值
    // 若果初始值也没有,数组也没有元素,则提示信息
    if (!_arr.length) {
      throw new Error('initVal and Array.length>0 need one')
    }

    res = _arr[i]
    i++
  }

  // 2.循环调用`callback`,将每次调用结果,作为第一个参数
  for (; i < _arr.length; i++) {
    const ret = callback(res, _arr[i], i, _arr)
    if (ret === undefined) {
      throw new Error('should be return a value')
    }
    res = ret
  }

  // 3.返回结果
  return res
}
const arr = [1, 2, 3]

console.log(
  arr.myReduce((prev, next) => {
    console.log(prev, next)
    return prev + next
  })
)
