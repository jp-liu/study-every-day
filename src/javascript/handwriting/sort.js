const test1 = [2, 3, 1, 512, 532, 11, 556, 78, 90, 877]
const test2 = [2, 3, 1, 512, 532, 11, 556, 78, 90, 12, 877]
const test3 = [2, 3, 1, 512, 532, 11, 556, 78, 90, 33, 877]
// 1.冒泡排序
function bubblingSort(arr) {
  const len = arr.length - 1
  let flag = true
  let index = len
  let maxIndex = 0
  // const minIndex = 0
  for (let i = 0; i <= len; i++) {
    flag = true
    for (let j = 0; j < index; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        flag = false
        // 说明当前位置后面已经有序
        maxIndex = j
      }
    }
    if (flag) break
    index = maxIndex
  }
  return arr
}
console.time('test1')
console.log('冒泡排序', bubblingSort(test1))
console.timeEnd('test1')

// 2.快速排序
// 时间复杂度：O(nlogn)
// 空间复杂度：O(logn)
function quickSort(arr) {
  if (arr.length <= 1) return arr
  const flag = arr[0]
  const left = []
  const right = []
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > flag) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }
  return quickSort(left).concat(flag, quickSort(right))
}
console.time('test2')
console.log('快速排序', quickSort(test2))
console.timeEnd('test2')

// 2.1 原地快排
// 时间复杂度：O(nlogn)
// 空间复杂度：O(1)
function quickSortInPlace(arr, start = 0, end = arr.length - 1) {
  if (start < end) {
    const index = quickHelper(arr, start, end)
    quickSortInPlace(arr, start, index - 1)
    quickSortInPlace(arr, index, end)
  }
  return arr
}
// 辅助函数,确定中分基准点
function quickHelper(arr, start, end) {
  const init = start
  const flag = arr[init]
  start++
  while (start <= end) {
    // 从后往前查找比 flag 小的元素
    while (arr[end] > flag) {
      end--
    }
    // 从前向后查找比 flag 大的元素
    while (arr[start] < flag) {
      start++
    }
    if (start < end) {
      // 小的和大的交换位置, 确保右小,左大
      ;[arr[start], arr[end]] = [arr[end], arr[start]]
      start++
      end--
    }
  }
  // 将基准点确定为中心
  ;[arr[init], arr[start - 1]] = [arr[start - 1], arr[init]]
  return start
}
console.time('test3')
console.log('原地快速排序', quickSortInPlace(test3))
console.timeEnd('test3')
