/*
 * @lc app=leetcode.cn id=188 lang=typescript
 *
 * [188] 买卖股票的最佳时机 IV
 */

// @lc code=start
function maxProfit(k: number, prices: number[]): number {
  const len = prices.length

  // 因为只能第一天买第二天卖掉,一个买卖周期就是 2 天,len 天内,
  // 最多进行 len/2 次,超过,则没有意义,就和说不限次数是一样的
  if (k > len >> 1) return maxProfitInfinity(prices)

  const dp = new Array(len)
    .fill(0)
    .map(() => new Array(k + 1).fill(0).map(() => new Array(2).fill(0)))

  for (let i = 0; i < len; i++) {
    for (let j = 1; j <= k; j++) {
      if (i - 1 === -1) {
        dp[0][j][0] = 0
        dp[0][j][1] = -prices[i]
        continue
      }
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i])
      dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i])
    }
  }
  return dp[len - 1][k][0]
}
function maxProfitInfinity(prices: number[]): number {
  let dp_i_0 = 0
  let dp_i_1 = -Infinity
  for (let i = 0; i < prices.length; i++) {
    dp_i_1 = Math.max(dp_i_1, dp_i_0 - prices[i])
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
  }
  return dp_i_0
}
// @lc code=end
