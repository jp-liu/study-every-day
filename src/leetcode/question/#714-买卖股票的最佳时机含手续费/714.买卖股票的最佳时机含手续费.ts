/*
 * @lc app=leetcode.cn id=714 lang=typescript
 *
 * [714] 买卖股票的最佳时机含手续费
 */

// @lc code=start
function maxProfit(prices: number[], fee: number): number {
  // 1.贪心,只要能挣钱就买卖
  // let ret = 0
  // let minPrice = Infinity
  // for (let i = 0; i < prices.length; i++) {
  //   // 当前的钱大于之前的
  //   if (prices[i] < minPrice) {
  //     minPrice = prices[i]
  //   }
  //   if (prices[i] >= minPrice && prices[i] <= fee + minPrice) {
  //     continue
  //   }
  //   if (prices[i] > minPrice + fee) {
  //     ret += prices[i] - minPrice - fee
  //     // 卖出和买入,在同一天只收一次手续费啊
  //     minPrice = prices[i] - fee
  //   }
  // }
  // 2.贪心算法
  // let buy = prices[0] + fee
  // for (let i = 0; i < prices.length; i++) {
  //   // 更低的买入价格
  //   if (prices[i] + fee < buy) {
  //     buy = prices[i] + fee
  //   }
  //   // 高于买入价格,则可以出售挣钱
  //   else if (prices[i] > buy) {
  //     ret += prices[i] - buy
  //     buy = prices[i] // 卖掉的同时买入就没有手续费了
  //   }
  // }
  // return ret

  // 3.动态规划 降维
  const dp = [0, -prices[0]]
  for (let i = 1; i < prices.length; i++) {
    // 不持股,拥有最多的钱
    dp[0] = Math.max(dp[0], dp[1] + prices[i] - fee)
    // 持股
    dp[1] = Math.max(dp[1], dp[0] - prices[i])
  }
  return dp[0]
}
// @lc code=end
