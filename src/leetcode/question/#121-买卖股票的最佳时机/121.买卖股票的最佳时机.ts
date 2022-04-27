/*
 * @lc app=leetcode.cn id=121 lang=typescript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
function maxProfit(prices: number[]): number {
  // 贪心算法
  let min = Infinity
  let ret = 0
  for (let i = 0; i < prices.length; i++) {
    min = Math.min(prices[i], min)
    ret = Math.max(ret, prices[i] - min)
  }
  return ret
  // 动态规划适合解决球最终最优解
  // 多阶段决策问题
  // 掌握 `后无效性`: 将约束条件设置为状态
  // 这题后无效性: 只能买卖一次,所以设计每天是否持股为状态,持股就能卖不持股不能卖
  const len = prices.length
  const dp = new Array(len)
  // 当天持有股票,和当天不持有股票,手头最多的钱
  dp[0] = [-prices[0], 0]
  for (let i = 1; i < len; i++) {
    dp[i] = [
      // 今天持股的情况
      // 昨天持股，今天什么都不做（现金数与昨天一样）；
      // 昨天不持股，今天买入股票（注意：只允许交易一次，因此手上的现金数就是当天的股价的相反数）。
      Math.max(dp[i - 1][0], -prices[i]),
      // 今天不持股
      // 昨天没有股,今天啥也不干
      // 昨天有股票,今天卖掉,今天买的钱去掉 昨天买的钱
      Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i])
    ]
  }
  return dp[len - 1][1]
}
export {}
// @lc code=end
