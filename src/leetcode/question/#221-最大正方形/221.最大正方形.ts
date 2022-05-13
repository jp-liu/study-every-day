/*
 * @lc app=leetcode.cn id=221 lang=typescript
 *
 * [221] 最大正方形
 */

// @lc code=start
function maximalSquare(matrix: string[][]): number {
  // 递推状态: dp[i][j] 表示以 ij 为正方形右下角,能组成正方形的最大边长
  // 递推公式: dp[i][j] = 左侧,上方,左上方三个点的最小值 + 1
  // 边界: 所有点默认均为 0 边长
  let minEdge = 0
  const m = matrix.length
  const n = matrix[0].length
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === '1') {
        if (i === 0 || j === 0) {
          dp[i][j] = 1
        } else {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1
        }
        minEdge = Math.max(minEdge, dp[i][j])
      }
    }
  }
  return minEdge * minEdge
}
// @lc code=end

maximalSquare([
  ['0', '1'],
  ['1', '0']
])
