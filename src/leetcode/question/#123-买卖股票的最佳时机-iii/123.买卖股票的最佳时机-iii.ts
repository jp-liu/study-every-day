/*
 * @lc app=leetcode.cn id=123 lang=typescript
 *
 * [123] 买卖股票的最佳时机 III
 */

// @lc code=start
function maxProfit(prices: number[]): number {
  // 状态定义: dp[i][k][0] 第 i 天, 在 k 次交易下,手里不持股票最高收益
  // 状态定义: dp[i][k][1] 第 i 天, 在 k 次交易下,手里持有股票最高收益
  // 动态转移方程: dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i]) 昨天不持/昨天持有今天卖掉
  // 动态转移方程: dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i]) 昨天持有/昨天不持有,今天买入,买入消耗一次购买机会
  const n = prices.length
  const K = 2 // 可交易次数
  const dp = new Array(n + 1)
    .fill(0)
    .map(() => new Array(K + 1).fill(0).map(() => [0, 0]))
  for (let k = 1; k < K + 1; k++) {
    dp[0][k][0] = 0 // 第0天不持股
    dp[0][k][1] = -prices[0] // 第0天持股
  }
  for (let i = 1; i <= n; i++) {
    for (let k = 1; k <= K; k++) {
      dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i - 1])
      dp[i][k][1] = Math.max(
        dp[i - 1][k][1],
        dp[i - 1][k - 1][0] - prices[i - 1]
      )
    }
  }
  // 第n天,经历k次交易没手头不持有股票的收益
  return dp[n][K][0]
}
// @lc code=end
export {}
maxProfit([3, 3, 5, 0, 0, 3, 1, 4])

function maxProfit1(prices: number[]): number {
  // 最多两笔交易
  // 一次都不买入
  // 第一次买入手头最多的钱
  // 第一次卖出手头最多的钱
  // 第二次买入手头最多的钱
  // 第二次卖出手头最多的钱
  const len = prices.length
  // const dp = new Array(len).fill(0).map(() => new Array(5).fill(0))
  // dp[0][1] = -prices[0] // 第一次买入
  // dp[0][3] = -prices[0] // 第二次买入
  // for (let i = 1; i < len; i++) {
  //   // 1.继续不买入
  //   dp[i][0] = dp[i - 1][0]
  //   // 2.第一次买入
  //   dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
  //   // 2.第一次卖出
  //   dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + prices[i])
  //   // 2.第二次买入
  //   dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] - prices[i])
  //   // 2.第二次卖出
  //   dp[i][4] = Math.max(dp[i - 1][4], dp[i - 1][3] + prices[i])
  // }
  // return dp[len - 1][4]
  // 2.利用滚动数组降维缩小空间复杂度
  const dp = [0, -prices[0], 0, -prices[0], 0]
  for (let i = 1; i < len; i++) {
    dp[1] = Math.max(dp[1], dp[0] - prices[i])
    dp[2] = Math.max(dp[2], dp[1] + prices[i])
    dp[3] = Math.max(dp[3], dp[2] - prices[i])
    dp[4] = Math.max(dp[4], dp[3] + prices[i])
  }
  return dp[4]
}
