/*
 * @lc app=leetcode.cn id=1312 lang=typescript
 *
 * [1312] 让字符串成为回文串的最少插入次数
 */

// @lc code=start
function minInsertions(s: string): number {
  // 1.求最烧操作次数,那么有两种情况,
  // 1.1 本身即是回文,无需处理
  // 1.2 不是回文,则要处理  aabaaxy 可以知道最长回文是 aabaa 那么我们可以在开头插入 yx, 也可以在结尾插入 xaabaa
  // 在回文前面插入不是回文的部分,就是回文了   不是回文则以结尾为中心,将字符串添加颠倒一下,也是会回文
  // 不过很明显是将获取回文的操作次数少
  // 状态定义: dp[i][j] 表示字符串第i位到j位,最长回文串的长度
  // 动态转移方程: 当 s[i] == s[j] dp[i][j] = dp[i + 1][j-1] + 2 aba b的最长回文是1,那么0-2的最长是 b + 2
  // 不相等时 dp[i][j] = Math.max(dp[i][j-1], dp[i+1][j]) abad  a-d ab不相等,则看之中的最长回文的长度,既 aba bad
  const n = s.length
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0))
  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1
    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
      }
    }
  }
  return n - dp[0][n - 1]
}
// @lc code=end
