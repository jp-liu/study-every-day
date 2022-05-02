/*
 * @lc app=leetcode.cn id=1473 lang=typescript
 *
 * [1473] 粉刷房子 III
 */

// @lc code=start
function minCost(costs: number[][]): number {
  // 1.递推状态: dp[i][0] 是当前位置涂红色的最小花费,那么 i-1 就只能是蓝或者绿了
  // 1.递推状态: dp[i][1] 是当前位置涂蓝色的最小花费
  // 1.递推状态: dp[i][2] 是当前位置涂绿色的最小花费
  // 2.递推公式: dp[i][0] = Math.min(dp[i-1][1], dp[i-1][2]) + costs[i]
  // 3.边界情况: 第一个房子红蓝绿的最小花费
  const dp = [[costs[0][0], costs[0][1], costs[0][2]]]

  for (let i = 1; i < costs.length; i++) {
    dp[i] = []
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + costs[i][0] // 红
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + costs[i][1] // 蓝
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + costs[i][2] // 绿
  }
  return Math.min(...dp[costs.length - 1])
}
// @lc code=end
