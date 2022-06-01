/*
 * @lc app=leetcode.cn id=309 lang=typescript
 *
 * [309] 最佳买卖股票时机含冷冻期
 */

// @lc code=start
function maxProfit(prices: number[]): number {
  // 冷冻期一天,就是持有股票需要个一天, 那么就是 dp[i-2][0] - prices[i] 买入从需要隔一天
  let dp_i_0 = 0
  let dp_i_1 = -Infinity
  let pre_dp_0 = 0 // 前天
  for (let i = 0; i < prices.length; i++) {
    let temp = dp_i_0 // 保留昨天
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]) // 计算今天
    dp_i_1 = Math.max(dp_i_1, pre_dp_0 - prices[i]) // 计算今天
    pre_dp_0 = temp // 昨天变前天
  }
  return dp_i_0
}
// @lc code=end
export {}

function maxProfit1(prices: number[]): number {
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
