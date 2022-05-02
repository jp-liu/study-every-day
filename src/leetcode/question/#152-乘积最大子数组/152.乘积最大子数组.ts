/*
 * @lc app=leetcode.cn id=152 lang=typescript
 *
 * [152] 乘积最大子数组
 */

// @lc code=start
function maxProduct(nums: number[]): number {
  // 1.递推状态: dp[i][0] 是当前位置和之前子数组乘积的最大值
  //            dp[i][1] 是当前位置和之前子数组乘积的最小值(有可能是负数和负数相乘,变成最大值了)
  // 2.递推公式: dp[i][0] = Math.max(dp[i - 1][0] * nums[i], dp[i - 1][1] * nums[i], nums[i])
  // 2.递推公式: dp[i][1] = Math.min(dp[i - 1][0] * nums[i], dp[i - 1][1] * nums[i], nums[i])
  // 3.边界条件: dp[0][1] = dp[0][1] = nums[0]
  const len = nums.length
  const dp = new Array(len).fill(0).map(() => new Array(2).fill(0))
  dp[0][0] = dp[0][1] = nums[0]
  let ans = nums[0]
  for (let i = 1; i < nums.length; i++) {
    const val0 = nums[i]
    const val1 = dp[i - 1][0] * val0
    const val2 = dp[i - 1][1] * val0
    dp[i][0] = Math.max(val0, val1, val2)
    dp[i][1] = Math.min(val0, val1, val2)
    ans = Math.max(ans, dp[i][0], dp[i][1])
  }
  return ans
}
// @lc code=end
