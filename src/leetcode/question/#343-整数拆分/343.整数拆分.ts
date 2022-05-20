/*
 * @lc app=leetcode.cn id=343 lang=typescript
 *
 * [343] 整数拆分
 */

// @lc code=start
function integerBreak(n: number): number {
  // 1.正整数拆分为 K 个数的和, K <= n/2 + 1 大于这个数,则乘积只会小,不会大
  // 例如:
  // 2 => 1 1
  // 3 => 1 2 || 1 1 1  k > 2 之后只会更小
  // 4 => 1 2 1 || 2 2 || 2 1 1 || 1 1 1 1  k > 3 只会更小
  // 状态定义: dp[i] 表示拆分当前i所能得到的最大乘积
  // 动态转移方程: dp[i] = Math.max(dp[i], dp[i - j] * j, (i - j) * j)
  const dp = new Array(n + 1).fill(0)
  dp[2] = 1
  for (let i = 3; i <= n; i++) {
    // 拆分几份,最少拆分一次,所以j = 1,不为0
    for (let j = 1; j <= (i >> 1) + 1; j++) {
      // dp[i] 是上一次计算的结果,参与计算即可
      // dp[i - j] * j 将 i 拆分成 j 和 i−j 的和，且 i−j 继续拆分成多个正整数，此时的乘积是 j*dp[i−j]
      // i - j 就相当于,4只分两部分, 1*3, 2*2 这样的乘积
      dp[i] = Math.max(dp[i], dp[i - j] * j, (i - j) * j)
    }
  }
  return dp[n]
}
// @lc code=end

function integerBreak1(n: number): number {
  // 1.正整数拆分为 K 个数的和, K <= n/2 + 1 大于这个数,则乘积只会小,不会大
  // 例如:
  // 2 => 1 1
  // 3 => 1 2 || 1 1 1  k > 2 之后只会更小
  // 4 => 1 2 1 || 2 2 || 2 1 1 || 1 1 1 1  k > 3 只会更小
  // 2.完全背包问题,使用 i 个数拼成 j 的最小乘积  物品: k个数, 背包: n 价值: 乘积
  // 状态定义: dp[i][j] 是使用 i 个数,组成 j 的最小乘积
  // 动态转移方程: dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - i] * i)
  if (n == 3) return 2
  const dp = new Array((n >> 1) + 2).fill(0).map(() => new Array(n + 1).fill(1))
  for (let j = 2; j <= n; j++) {
    for (let i = 2; i <= (j >> 1) + 1; i++) {
      if (i === 2) {
        dp[i][j] = (j >> 1) * (j - (j >> 1))
        continue
      }
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - i] * i)
    }
  }
  return dp[n >> 1][n]
}
