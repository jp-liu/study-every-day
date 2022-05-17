/*
 * @lc app=leetcode.cn id=1137 lang=typescript
 *
 * [1137] 第 N 个泰波那契数
 */

// @lc code=start
function tribonacci(n: number): number {
  // if (n <= 1) return n
  // let top = 0
  // let center = 1
  // let bottom = 1

  // for (let i = 3; i <= n; i++) {
  //     [top, center, bottom] = [center, bottom, top + center + bottom]
  // }
  // return bottom
  const dp = [0, 1, 1]

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3]
  }
  return dp[n]
}
// @lc code=end
