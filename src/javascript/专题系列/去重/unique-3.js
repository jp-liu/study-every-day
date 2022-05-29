const test = [2, 1, 1, 3, 4, 2, 3, 4, 3, 3]

function unique(arr) {
  // 排序示例
  const tempArr = arr.slice().sort((a, b) => a - b)
  const res = []
  let seen
  for (let i = 0; i < tempArr.length; i++) {
    const value = tempArr[i]
    // 第一个元素直接进来, 第二个元素需要和上一的元素进行比较
    if (!i || seen !== value) {
      res.push(value)
    }
    seen = value
  }
  return res
}

console.log(unique(test))
