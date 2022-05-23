/*
 * @lc app=leetcode.cn id=383 lang=typescript
 *
 * [383] 赎金信
 */

// @lc code=start
function canConstruct(ransomNote: string, magazine: string): boolean {
  if (ransomNote.length > magazine.length) return false
  const ans = new Array(26).fill(0)
  const base = 'a'.charCodeAt(0)
  for (let i = 0; i < magazine.length; i++) {
    ans[magazine[i].charCodeAt(0) - base]++
    ransomNote[i] && ans[ransomNote[i].charCodeAt(0) - base]--
  }
  return ans.every(v => v >= 0)
}
// @lc code=end
