/*
 * @lc app=leetcode.cn id=62 lang=typescript
 *
 * [62] 不同路径
 */

// @lc code=start
function uniquePaths(m: number, n: number): number {
  // 1.只能向下或者向上走,一条行和第一列都只能直走到达,方法为1中
  // 2.终点的到达终点的方式,只有上下两个点,即:
  // dp[i][i] = dp[i-1][j] + dp[i][j-1]
  const dp = new Array(m).fill('').map(() => new Array(n).fill(''))
  for (let i = 0; i < dp.length; i++) dp[i][0] = 1 // 第一列的到达方式
  for (let i = 0; i < dp[0].length; i++) dp[0][i] = 1 // 第一行的到达方式

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[m - 1][n - 1]
}
// @lc code=end
