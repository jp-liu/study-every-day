/*
 * @lc app=leetcode.cn id=309 lang=typescript
 *
 * [309] 最佳买卖股票时机含冷冻期
 */

// @lc code=start
function maxProfit(prices: number[]): number {
  // 状态定义: dp[i][0] 当天不持有股票的最大收益  dp[i][1] 当天持有股票的最大收益
  const len = prices.length
  if (len < 2) return 0
  const dp = new Array(len).fill(0).map(() => new Array(2).fill(0))
  dp[0][1] = -prices[0]
  dp[1][0] = Math.max(0, dp[0][1] + prices[1])
  dp[1][1] = Math.max(dp[0][1], -prices[1])
  for (let i = 2; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[i])
  }
  return dp[len - 1][0]
}
// @lc code=end
