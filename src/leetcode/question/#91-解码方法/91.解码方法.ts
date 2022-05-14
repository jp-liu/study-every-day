/*
 * @lc app=leetcode.cn id=91 lang=typescript
 *
 * [91] 解码方法
 */

// @lc code=start
function numDecodings(s: string): number {
  // 状态定义: dp[i] 表示以i结尾的字符串的编码总数\
  const len = s.length
  const dp = new Array(len + 1).fill(0)
  dp[0] = 1
  dp[1] = s[0] === '0' ? 0 : 1
  for (let i = 2; i <= len; i++) {
    const val1 = +s[i - 1]
    const val2 = +s[i - 2] * 10 + val1
    if (val1 > 0) dp[i] += dp[i - 1] // 独立成一个编码,则累加上一个
    if (val2 > 9 && val2 <= 26) dp[i] += dp[i - 2] // 组合成为一个编码,累加上上一个,中间那个不能独立计算了,被组合了
  }
  return dp[len]
}
// @lc code=end
