/*
 * @lc app=leetcode.cn id=167 lang=typescript
 *
 * [167] 两数之和 II - 输入有序数组
 */

// @lc code=start
function twoSum(nums: number[], target: number): number[] {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    const sum = nums[left] + nums[right]
    if (sum === target) {
      return [left + 1, right + 1]
    } else if (sum > target) {
      right--
    } else {
      left++
    }
  }
}
// @lc code=end
