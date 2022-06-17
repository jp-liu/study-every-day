/*
 * @lc app=leetcode.cn id=1089 lang=typescript
 *
 * [1089] 复写零
 */

// @lc code=start
/**
 Do not return anything, modify arr in-place instead.
 */
function duplicateZeros(arr: number[]): void {
  let n = arr.length,
    i = 0,
    j = 0
  while (j < n) {
    if (arr[i] === 0) j++
    i++, j++
  }
  i--, j--

  while (i >= 0) {
    if (j < n) arr[j] = arr[i]
    if (arr[i] === 0 && --j >= 0) arr[j] = 0
    i--, j--
  }
}
// @lc code=end
