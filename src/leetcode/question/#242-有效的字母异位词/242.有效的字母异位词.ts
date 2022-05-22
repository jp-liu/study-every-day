/*
 * @lc app=leetcode.cn id=242 lang=typescript
 *
 * [242] 有效的字母异位词
 */

// @lc code=start
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false
  const ans = new Array(26).fill(0)
  const base = 'a'.charCodeAt(0)
  for (let i = 0; i < s.length; i++) {
    ans[s[i].charCodeAt(0) - base]++
    ans[t[i].charCodeAt(0) - base]--
  }
  return ans.every(v => v === 0)
}
// @lc code=end
