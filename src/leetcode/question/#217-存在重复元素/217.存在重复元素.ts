/*
 * @lc app=leetcode.cn id=217 lang=typescript
 *
 * [217] 存在重复元素
 */

// @lc code=start
function containsDuplicate(nums: number[]): boolean {
  nums.sort()
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) return true
  }
  return false
}
// @lc code=end
