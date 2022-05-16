/*
 * @lc app=leetcode.cn id=486 lang=typescript
 *
 * [486] 预测赢家
 */

// @lc code=start
function PredictTheWinner(nums: number[]): boolean {
  // 第一: 双方都采取的最优策略,
  // 第二: 游戏可进行次数为 nums.length
  // 递推状态定义: dp[i][j] 表示当前对局 nums[i ~ j] 中先手玩家比后手玩家多的钱, 所以 i <= j
  // 当前我选了, 后手玩家就是在这两个去加那种先手了 dp[i + 1][j], dp[i][j - 1]
  // 那么 Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]) 就是当前我能多多少钱
  const n = nums.length
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0))
  for (let i = 0; i < n; i++) dp[i][i] = nums[i]
  for (let i = n - 2; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      dp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1])
    }
  }
  return dp[0][n - 1] >= 0
}
// @lc code=end
