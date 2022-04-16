/*
 * @lc app=leetcode.cn id=15 lang=typescript
 *
 * [15] 三数之和
 */

// @lc code=start
function threeSum(nums: number[]): number[][] {
  const answer = []
  const len = nums.length
  nums.sort((a, b) => a - b)
  // [-1,0,1,2,-1,-4]
  // [-4,-1,-1,0,1,2]
  // 如果没有负数或者正数,则无解
  if (nums[0] <= 0 && nums[len - 1] >= 0) {
    let i = 0
    while (i < len - 2) {
      if (nums[i] > 0) break // 最小值大于零,无解
      let first = i + 1
      let last = len - 1
      while (first < last) {
        if (nums[i] * nums[last] > 0) break // 同正或者同负,无解
        const sum = nums[i] + nums[first] + nums[last]
        if (sum === 0) {
          answer.push([nums[i], nums[first], nums[last]])
        }
        if (sum <= 0) {
          // 和太小,最小值右移
          while (nums[first] === nums[++first]) {} // 去除相同值
        } else {
          while (nums[last] === nums[--last]) {}
        }
      }
      while (nums[i] === nums[++i]) {}
    }
  }

  return answer
}
// @lc code=end
