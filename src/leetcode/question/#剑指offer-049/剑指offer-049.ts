/*
 * @lc app=leetcode.cn id=100178 lang=typescript
 *
 * [剑指offer] 剑指offer-091
 */

// @lc code=start
function minCost(costs: number[][]): number {
  // 状态定义：dp[i][0-2] 是对应的房子涂对应颜色的最小花费
  // 动态转移方程：dp[i][0] = Math.min(dp[i-1][1], dp[i-1][2])
  const dp = [costs[0]]
  for (let i = 1; i < costs.length; i++) {
    dp[i] = []
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + costs[i - 1][0]
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + costs[i - 1][1]
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + costs[i - 1][2]
  }
  return Math.min(...dp[costs.length - 1])
}
// @lc code=end
minCost([
  [17, 2, 17],
  [16, 16, 5],
  [14, 3, 19]
])
