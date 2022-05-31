const test = [1, 1, 2, 2, 3, 3, 3]

function unique(arr) {
  const res = []
  for (let i = 0, arrLen = arr.length; i < arrLen; i++) {
    // 没有就添加进去
    if (!res.includes(arr[i])) {
      // if(res.indexOf(arr[i]) === -1) {
      res.push(arr[i])
    }
  }
  return res
}

console.log(unique(test))
