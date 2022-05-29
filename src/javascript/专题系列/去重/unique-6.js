const test = [2, 1, 1, 3, 4, 2, 3, 4, 3, 3, 'a', 'A']

function unique1(arr) {
  // 如果重复,indexOf 返回的是第一个item的下标, 与当前 idx 不同
  return arr.filter((item, idx) => arr.indexOf(item) === idx)
}

function unique(arr) {
  // 一样,下标0直接进入,其他的和前一项对比即可
  return arr
    .slice()
    .sort()
    .filter((item, idx, arr) => !idx || item !== arr[idx - 1])
}

console.log(unique1(test))
console.log(unique(test))
