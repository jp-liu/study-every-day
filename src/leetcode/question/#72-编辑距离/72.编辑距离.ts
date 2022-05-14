/*
 * @lc app=leetcode.cn id=72 lang=typescript
 *
 * [72] 编辑距离
 */

// @lc code=start
function minDistance(word1: string, word2: string): number {
  // 对两个字符串进行操作,各一步,和操作一个字符串两次,是一样的结果,一样的次数啊
  // 所以只操作第一个字符串就行了啊,那么存在的情况时只有三种了
  // 递推状态: dp[i][j] 表示字符串第一个字符串第 i 位,和变为第二个字符串第 j 位相同所需要的操作步数
  // 递推公式: dp[i][j] 可以转换得到的操作是
  // 1.二者本来就相同,则 dp[i][j] = dp[i - 1][j - 1]
  // 2.插入一位: dp[i][j-1]
  // 3.删除一位: dp[i-1][j]
  // 4.编辑一位: dp[i-1][j-1]
  const m = word1.length
  const n = word2.length
  const dp: number[][] = new Array(m + 1)
    .fill(0)
    .map(() => new Array(n + 1).fill(0))
  for (let i = 1; i <= n; i++) dp[0][i] = i // 第一行,空字符串变为n需要的操作次数,都是i
  for (let i = 1; i <= m; i++) {
    dp[i][0] = i // 第一列,每一个字符串变成空串需要的操作次数就是i
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1]
      else dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1
    }
  }
  return dp[m][n]
}
// @lc code=end
