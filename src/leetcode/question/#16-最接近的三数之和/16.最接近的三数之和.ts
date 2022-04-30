/*
 * @lc app=leetcode.cn id=16 lang=typescript
 *
 * [16] 最接近的三数之和
 */

// @lc code=start
function threeSumClosest(nums: number[], target: number): number {
  // 排序 + 双指针
  nums.sort((a, b) => a - b)

  let i = 0
  const len = nums.length
  let ans = Infinity
  while (i < len - 2) {
    let left = i + 1
    let right = len - 1
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]
      if (Math.abs(target - sum) < Math.abs(target - ans)) ans = sum
      if (sum > target) {
        --right
      } else if (sum < target) {
        ++left
      } else {
        return ans
      }
    }
    i++
  }
  return ans
}
// @lc code=end
