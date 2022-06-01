/*
 * @lc app=leetcode.cn id=122 lang=typescript
 *
 * [122] 买卖股票的最佳时机 II
 */

// @lc code=start
function maxProfit(prices: number[]): number {
  let dp_i_0 = 0
  let dp_i_1 = -Infinity
  for (let i = 0; i < prices.length; i++) {
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
    dp_i_1 = Math.max(dp_i_1, dp_i_0 - prices[i])
  }
  return dp_i_0
}
// @lc code=end
function maxProfit1(prices: number[]): number {
  // 1.贪心
  // 每次都买卖,直到最大值
  // let ret = 0
  // for (let i = 0; i < prices.length; i++) {
  //   if (prices[i] - prices[i - 1] > 0) {
  //     ret += prices[i] - prices[i - 1]
  //   }
  // }
  // return ret

  // 2.动态规划
  // const len = prices.length
  // const dp = new Array(len).fill(0).map(() => new Array(2).fill(0))

  // dp[0][0] = 0            // 第一天不持有股票
  // dp[0][1] = -prices[0]   // 第一天持有股票
  // for (let i = 1; i < len; i++) {
  //   // 不持股
  //   // 1.将之前的卖掉
  //   // 2.继续不买
  //   dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
  //   // 持股
  //   // 1.卖出
  //   // 2.继续持有
  //   dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
  // }
  // return dp[len - 1][0]
  // 3.动态规划 => 采用滚动数组 = 降维,降低空间复杂度
  const dp = [0, -prices[0]]
  for (let i = 1; i < prices.length; i++) {
    dp[0] = Math.max(dp[0], dp[1] + prices[i])
    dp[1] = Math.max(dp[1], dp[0] - prices[i])
  }
  return dp[0]
}
export {}
