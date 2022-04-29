/*
 * @lc app=leetcode.cn id=392 lang=typescript
 *
 * [392] 判断子序列
 */

// @lc code=start
function isSubsequence(s: string, t: string): boolean {
  const m = s.length
  const n = t.length
  if (!m) return true
  if (m > n) return false

  // +1 都是为了补全基准值
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // 1.判断 s 是否是 t 的子序列,就是在 t中寻找一个s
      // 2.问题等价为,在 t 中寻找一个与 s 相同长度的子序列
      // 如果相等,则子序列长度+1
      // 在上一步的基础上完善了
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        // 不相等,则最长子序列为上一个元素的
        dp[i][j] = dp[i][j - 1]
      }
    }
  }
  return dp[m][n] === m
  // 双指针
  // let sLen = s.length
  // let tLen = t.length
  // let i = 0, j = 0
  // while (i<sLen && j < tLen) {
  //   // 相同,则继续进行下一个子序列判断,逐步增加
  //   if (s[i] === t[j]) i++
  //   j++
  // }
  // return i === sLen
}
// @lc code=end
