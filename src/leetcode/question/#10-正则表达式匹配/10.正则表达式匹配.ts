/*
 * @lc app=leetcode.cn id=10 lang=typescript
 *
 * [10] 正则表达式匹配
 */

// @lc code=start
function isMatch(s: string, p: string): boolean {
  const m = s.length
  const n = p.length
  const memo = {}
  return dp(0, 0)

  function dp(i: number, j: number): boolean {
    // 状态定义: dp[i][j] 表示s[i - 1] 是否和 p[j - 1] 匹配
    // 同时匹配到了最后
    if (j === n) return i === m
    // s 到了最后,查看p是否完全匹配
    if (i === m) {
      // a  ab*c* 如果不是偶数出现,则肯定不符合,因为要 * 一个字符
      if ((n - j) % 2 !== 0) {
        return false
      }
      // 要每一个都是 * 才能完全匹配
      for (; j + 1 < n; j += 2) {
        if (p[j + 1] !== '*') return false
      }
      return true
    }
    const key = `${i},${j}`
    if (memo[key]) return memo[key]

    let res = false
    // 判断相同
    if (s[i] === p[j] || p[j] === '.') {
      // 如果下一位是通配符,那么刻意选择匹配0个或者多个,有一个满足即可
      if (j < n - 1 && p[j + 1] === '*') {
        // aa   a*aa
        // aa   a*
        res = dp(i, j + 2) || dp(i + 1, j)
      } else {
        // abc  ab
        res = dp(i + 1, j + 1)
      }
    }
    // 判断不相等
    else {
      if (j < n - 1 && p[j + 1] === '*') {
        // bb   a*bb
        res = dp(i, j + 2)
      } else {
        res = false
      }
    }
    memo[key] = res
    return res
  }
}
// @lc code=end
