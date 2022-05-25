/*
 * @lc app=leetcode.cn id=467 lang=typescript
 *
 * [467] 环绕字符串中唯一的子字符串
 */

// @lc code=start
function findSubstringInWraproundString(p: string): number {
  // 状态定义: dp[i] 表示 p[i] 最长连续子串的长度 zab   b的最长子串长度是3,说明z, a, b都是单独连续存在的, 也就存在 z, za, zb, zab, a, ab, b
  // 动态转移方程: dp[i] = Math.max(dp[i], count)
  const dp = new Array(26).fill(0)
  let k = 1
  const base = 'a'.charCodeAt(0)
  for (let i = 0; i < p.length; i++) {
    const idx = p[i].charCodeAt(0) - base
    if (i > 0) {
      // 获取字符的编码比较是否连续
      const a = p[i].charCodeAt(0) % 26
      const b = (p[i - 1].charCodeAt(0) + 1) % 26
      // 连续长度则加一
      if (a === b) {
        k++
      }
      // 不连续则为自身,是1
      else {
        k = 1
      }
    }
    dp[idx] = Math.max(dp[idx], k)
  }
  return dp.reduce((a, b) => a + b)
}
// @lc code=end

findSubstringInWraproundString('zab')
