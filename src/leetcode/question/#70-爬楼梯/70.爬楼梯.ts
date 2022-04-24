/*
 * @lc app=leetcode.cn id=70 lang=typescript
 *
 * [70] 爬楼梯
 */

// @lc code=start
function climbStairs(n: number): number {
  // 每次可以爬 1-2 的台阶,那么也就是两种选择
  // dp[i] = dp[i-1] + dp[i-2]
  // 1.每种方案都存放
  const dp = [1, 2]
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n - 1]
}
// @lc code=end
