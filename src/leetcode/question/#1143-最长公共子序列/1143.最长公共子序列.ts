/*
 * @lc app=leetcode.cn id=1143 lang=typescript
 *
 * [1143] 最长公共子序列
 */

// @lc code=start
function longestCommonSubsequence(text1: string, text2: string): number {
  // 392,是判断子序列,这里是判断公共子序列,既两者都有的公共序列
  // 392.只判断了 j-1 也就是 t1 的序列, 这里加上 t2 的序列判断,就是二者公共的了
  const m = text1.length
  const n = text2.length
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        // 在二者公共序列中寻找一个最长部分
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  return dp[m][n]
}
// @lc code=end
