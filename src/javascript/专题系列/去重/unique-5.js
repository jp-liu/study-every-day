const test = [2, 1, 1, 3, 4, 2, 3, 4, 3, 3, 'a', 'A']

// iterate: 迭代
function unique(arr, isSorted, iterate) {
  const res = []
  let seen = []
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i]
    const computed = iterate ? iterate(value, i, arr) : value
    if (isSorted) {
      // 使用用户计算后的值进行比较
      if (!i || seen !== computed) {
        // 修改
        res.push(value) // 给用户返回的,可不需要被处理的值
      }
      seen = computed
    } else if (iterate) {
      // 采用seen进行比较,seen是保存了计算过后的值,不然 iteratee 就没有意义了
      if (!~seen.indexOf(computed)) {
        res.push(value)
        seen.push(computed)
      }
    } else if (!~res.indexOf(value)) {
      res.push(value)
    }
  }
  return res
}

console.log(unique(test))
console.log(
  unique(test, false, val => {
    if (typeof val === 'string') return val.toLowerCase()
    return val
  })
)
