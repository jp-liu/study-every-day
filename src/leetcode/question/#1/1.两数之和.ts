/*
 * @lc app=leetcode.cn id=1 lang=typescript
 *
 * [1] 两数之和
 */

// @lc code=start
function twoSum(nums: number[], target: number): number[] {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    const a = target - num
    if (map.has(a)) {
      return [map.get(a), i]
    } else {
      map.set(num, i)
    }
  }
}
// @lc code=end
