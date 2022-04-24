/*
 * @lc app=leetcode.cn id=63 lang=typescript
 *
 * [63] 不同路径 II
 */

// @lc code=start
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  // 和不同路径一的寻址方式一直,增加了障碍,过滤一下就行
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
  for (let i = 0; i < dp.length && obstacleGrid[i][0] !== 1; i++) dp[i][0] = 1 // 第一列的到达方式
  for (let i = 0; i < dp[0].length && obstacleGrid[0][i] !== 1; i++)
    dp[0][i] = 1 // 第一行的到达方式

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // 如果为1,则当前位置不可到达,也就是0
      dp[i][j] = obstacleGrid[i][j] === 1 ? 0 : dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[m - 1][n - 1]
}
// @lc code=end
