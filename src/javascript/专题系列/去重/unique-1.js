const test = [1, 1, 2, 2, 3, 3, 3]

function unique(arr) {
  const res = []
  for (let i = 0, arrLen = arr.length; i < arrLen; i++) {
    const resLen = res.length
    let j = 0
    for (; j < resLen; j++) {
      if (arr[i] === res[j]) break
    }
    // 如果 arr[i] 是唯一值,那么在res中就不会找到,所以 j 会遍历到最后
    // 也就是 j === resLen
    if (j === resLen) {
      res.push(arr[i])
    }
  }
  return res
}

console.log(unique(test))
