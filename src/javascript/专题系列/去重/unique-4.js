const test = [2, 1, 1, 3, 4, 2, 3, 4, 3, 3]

// isSorted: 是否有序
function unique(arr, isSorted) {
  const res = []
  let seen
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i]
    if (isSorted) {
      // 第一个元素直接进来, 第二个元素需要和上一的元素进行比较
      if (!i || seen !== value) {
        res.push(value)
      }
      seen = value
    } else if (!~res.indexOf(value)) {
      res.push(value)
    }
  }
  return res
}

console.log(unique(test))
test.sort((a, b) => a - b)
console.log(unique(test, true))
