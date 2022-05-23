/*
 * @lc app=leetcode.cn id=115 lang=typescript
 *
 * [115] 不同的子序列
 */

// @lc code=start
function numDistinct(s: string, t: string): number {
  // 状态定义: dp[i][j] 表示以 i 结尾的s[0-i], 和以 j 结尾的 t[0-j] 的相同子序列个数
  // 动态转移方程:
  //    - 1. s[i] === t[j] 二者相同, dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
  //                                           dp[i - 1][j - 1]: 使用二者当前字符串,就是和之前一样
  //                                           dp[i - 1][j]: 不使用当前 s[i], 相同子序列个数
  //    - 2. 不相同, dp[i][j] = dp[i - 1][j] // 没得选,只能用之前的,舍弃当前 s[i]
  const m = s.length
  const n = t.length
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  for (let i = 0; i < m; i++) dp[i][0] = 1
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i - 1] === t[j - 1]) dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
      else dp[i][j] = dp[i - 1][j]
    }
  }
  return dp[m][n]
}
// @lc code=end
