/*
 * @lc app=leetcode.cn id=977 lang=typescript
 *
 * [977] 有序数组的平方
 */

// @lc code=start
function sortedSquares(nums: number[]): number[] {
  let left = 0
  let right = nums.length - 1
  const ans = Array(nums.length)
  let k = right
  while (left <= right) {
    const l = nums[left] * nums[left]
    const r = nums[right] * nums[right]
    if (l > r) {
      ans[k] = l
      left++
    } else {
      ans[k] = r
      right--
    }
    k--
  }
  return ans
}
sortedSquares([-4, -1, 0, 3, 10])
// @lc code=end
