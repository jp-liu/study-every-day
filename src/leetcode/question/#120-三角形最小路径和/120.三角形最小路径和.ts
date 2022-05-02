/*
 * @lc app=leetcode.cn id=120 lang=typescript
 *
 * [120] 三角形最小路径和
 */

// @lc code=start
function minimumTotal(triangle: number[][]): number {
  //    2
  //   3 4
  //  6 5 7
  // 4 1 8 3
  // dp[i][j] 是每一行中的每个元素从上像下的路径和
  // dp[i][j] = Math.min(dp[i-1][j], dp[i-1][j - 1]) + triangle[j]
  // const dp = [[triangle[0][0]]]
  // // 第几行
  // for (let i = 1; i < triangle.length; i++) {
  //   dp[i] = new Array(i + 1).fill(0)
  //   // 第几个数字
  //   for (let j = 0; j < triangle[i].length; j++) {
  //     dp[i][j] =
  //       Math.min(dp[i - 1][j] ?? Infinity, dp[i - 1][j - 1] ?? Infinity) +
  //       triangle[i][j]
  //   }
  // }
  // return Math.min(...dp[triangle.length - 1])

  // 1.递推状态确定(主要是状态描述),从下到上,记录每一个最小路径和
  // 2.动态转移方程(递推公式): dp[i][j] = Math.min(dp[i + 1][j], dp[i+1][j + 1]) + triangle[i][j]
  // 3.边界情况
  const m = triangle.length
  const dp = new Array(m).fill(0).map(() => new Array(m))

  // 边界情况
  for (let i = 0; i < m; i++) dp[m - 1][i] = triangle[m - 1][i]

  // 具体实现
  for (let i = m - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j]
    }
  }
  return dp[0][0]
}
// @lc code=end
