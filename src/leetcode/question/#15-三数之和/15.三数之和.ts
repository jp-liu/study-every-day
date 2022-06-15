/*
 * @lc app=leetcode.cn id=15 lang=typescript
 *
 * [15] 三数之和
 */

// @lc code=start
function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b)

  const n = nums.length
  const ans: number[][] = []

  if (nums[0] <= 0 && nums[n - 1] >= 0) {
    let i = 0
    while (i < n - 2) {
      if (nums[i] > 0) break // 最小值已经超过0，不存在解
      let left = i + 1
      let right = n - 1
      while (left < right) {
        if (nums[i] * nums[right] > 0) break
        const sum = nums[i] + nums[left] + nums[right]

        if (sum === 0) ans.push([nums[i], nums[left], nums[right]])
        if (sum <= 0) {
          while (nums[left] === nums[++left]) {}
        } else {
          while (nums[right] === nums[--right]) {}
        }
      }
      while (nums[i] === nums[++i]) {}
    }
  }
  return ans
}
// @lc code=end
threeSum([-1, 0, 1, 2, -1, -4])
