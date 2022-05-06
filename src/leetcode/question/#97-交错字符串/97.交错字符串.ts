/*
 * @lc app=leetcode.cn id=97 lang=typescript
 *
 * [97] 交错字符串
 */

// @lc code=start
function isInterleave(s1: string, s2: string, s3: string): boolean {
  const m = s1.length,
    n = s2.length
  if (s3.length != m + n) return false
  // 动态规划，dp[i,j]表示s1前i字符能与s2前j字符组成s3前i+j个字符；
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(false))
  dp[0][0] = true
  for (let i = 1; i <= m && s1.charAt(i - 1) == s3.charAt(i - 1); i++)
    dp[i][0] = true // 不相符直接终止
  for (let j = 1; j <= n && s2.charAt(j - 1) == s3.charAt(j - 1); j++)
    dp[0][j] = true // 不相符直接终止
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        (dp[i - 1][j] && s3.charAt(i + j - 1) == s1.charAt(i - 1)) ||
        (dp[i][j - 1] && s3.charAt(i + j - 1) == s2.charAt(j - 1))
    }
  }
  return dp[m][n]
}
// @lc code=end
