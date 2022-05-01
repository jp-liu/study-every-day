/*
 * @lc app=leetcode.cn id=64 lang=typescript
 *
 * [64] 最小路径和
 */

// @lc code=start
function minPathSum(grid: number[][]): number {
  // 只能向右和下运动
  // dp[i][j] = Math.min(dp[i - 1][j], dp[i][j-1])
  const m = grid.length
  const n = grid[0].length
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
  dp[0][0] = grid[0][0]
  for (let i = 1; i < m; i++) {
    // 上一项的和加上当前值
    dp[i][0] = grid[i][0] + dp[i - 1][0]
  }
  for (let j = 1; j < n; j++) {
    dp[0][j] = grid[0][j] + dp[0][j - 1]
  }

  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      dp[row][col] =
        Math.min(dp[row - 1][col], dp[row][col - 1]) + grid[row][col]
    }
  }
  return dp[m - 1][n - 1]
}
// @lc code=end
