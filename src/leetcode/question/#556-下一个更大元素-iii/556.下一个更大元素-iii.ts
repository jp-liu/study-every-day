/*
 * @lc app=leetcode.cn id=556 lang=typescript
 *
 * [556] 下一个更大元素 III
 */

// @lc code=start
const MAX = 2147483647
function nextGreaterElement(n: number): number {
  const numArr = (n + '').split('')

  const len = numArr.length
  let i = len - 2
  while (i >= 0 && numArr[i] >= numArr[i + 1]) {
    i--
  }
  if (i < 0) return -1

  let j = len - 1
  while (j >= 0 && numArr[i] >= numArr[j]) {
    j--
  }
  ;[numArr[i], numArr[j]] = [numArr[j], numArr[i]]

  // 经过交换，后面的值还是从后向前递增，我们要求一个最小的，将后面 reverse 得到一个最小值，反转后就是从后向前递减，所以最小
  let k = i + 1
  let q = len - 1
  while (k < q) {
    ;[numArr[k], numArr[q]] = [numArr[q], numArr[k]]
    k++, q--
  }

  const num = +numArr.join('')
  if (num > MAX) return -1
  return num
}
// @lc code=end

nextGreaterElement(12443322)
