/*
 * @lc app=leetcode.cn id=26 lang=typescript
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
function removeDuplicates(nums: number[]): number {
  let slow = 0
  let fast = 1
  let k = 0
  while (fast < nums.length) {
    if (nums[slow] !== nums[fast]) {
      slow++
      k++
      nums[slow] = nums[fast]
    }
    fast++
  }
  return k + 1
}
// @lc code=end
