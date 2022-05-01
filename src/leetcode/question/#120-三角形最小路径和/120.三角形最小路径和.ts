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
  const dp = [[triangle[0][0]]]
  // 第几行
  for (let i = 1; i < triangle.length; i++) {
    dp[i] = new Array(i + 1).fill(0)
    // 第几个数字
    for (let j = 0; j < triangle[i].length; j++) {
      dp[i][j] =
        Math.min(dp[i - 1][j] ?? Infinity, dp[i - 1][j - 1] ?? Infinity) +
        triangle[i][j]
    }
  }
  return Math.min(...dp[triangle.length - 1])
}
// @lc code=end
