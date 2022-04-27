/*
 * @lc app=leetcode.cn id=518 lang=typescript
 *
 * [518] 零钱兑换 II
 */

// @lc code=start
function change(amount: number, coins: number[]): number {
  // 动态规划
  // dp[i] = dp[j - coins[i]]
  const dp = new Array(amount + 1).fill(0)
  dp[0] = 1
  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      // dp[j - coins[i]]
      // j 是 0 - 总额的不同阶段
      // j - coins[i] 就是在当前阶段,所需对应金额,比如
      // [1, 2, 5] 5
      // coins[i] = 1
      // j = 1 => 1
      // j = 2 => 2-1 = dp[1] = 1 // 能达成2
      // j = 3 => 3-1 = dp[2] = 1 // 能达成3
      // j = 4 => 4-1 = dp[3] = 1 // 能达成4
      // j = 5 => 5-1 = dp[4] = 1 // 能达成5
      //
      // coins[i] = 2
      // j = 2 => 2  1组成的一次加自己一次
      // j = 3 => 3-2 = dp[1] = 1 + 1 // 2一次 1一次,就是两次了
      // j = 4 => 4-2 = dp[2] = 1 + 1 // 2一次 1一次
      // j = 5 => 5-2 = dp[3] = 1 + 2 // 3两次 2一次
      dp[j] += dp[j - coins[i]]
    }
  }
  return dp[amount]
}
change(5, [2])
// @lc code=end
