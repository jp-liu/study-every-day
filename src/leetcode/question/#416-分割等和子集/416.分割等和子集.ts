/*
 * @lc app=leetcode.cn id=416 lang=typescript
 *
 * [416] 分割等和子集
 */

// @lc code=start
function canPartition(nums: number[]): boolean {
  // 1.和相等, 那么总数必须是偶数
  let sum = 0
  for (const val of nums) sum += val

  if (sum % 2) return false
  sum /= 2
  // 递推状态: dp[i] 表示 i 和值能否拼凑得到
  // dp[i] |= dp[j - i]
  // dp[i] 为1,与任何数与都是>0的, dp[i]不为1时,dp[i] = dp[i] + dp[j - i] 是否能够拼凑得到
  const dp = []
  dp[0] = 1
  for (let i = 0; i < nums.length; i++) {
    for (let j = sum; j >= nums[i]; j--) {
      // dp[j] 满足, 或者 dp[j - nums[i]] 满足,因为dp[j - nums[i]] 能满足,加上本身,就是可以拼凑得到 i
      // dp[j] = dp[j] || dp[j - nums[i]]
      dp[j] |= dp[j - nums[i]]
    }
    if (dp[sum]) break
  }
  return dp[sum] === 1
}
// @lc code=end
