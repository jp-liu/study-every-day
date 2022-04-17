/*
 * @lc app=leetcode.cn id=322 lang=typescript
 *
 * [322] 零钱兑换
 */

// @lc code=start
function coinChange(coins: number[], amount: number): number {
  // 动态规划,求出每一种总金额的最优解
  // 递推公式
  // dp[n] 在n的情况下,最优解就是 dp[n - coins[i]]
  // [2, 5] => 12
  // 当前硬币为2的时候
  // dp[2] = dp[2 - 2] + 1 只要1枚硬币
  // dp[5] = dp[5 - 2] + 1 = dp[3 - 2] + 1 = dp[1] + 1 = Infinity + 1,等于没有无法达到
  if (!amount) return 0

  // 动态规划题型解析
  // 边界条件
  // 循环
  //   递推公式
  // 返回结果
  const dp = Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j < dp.length; j++) {
      dp[j] = Math.min(dp[j - coins[i]] + 1, dp[j])
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]
}
// @lc code=end
