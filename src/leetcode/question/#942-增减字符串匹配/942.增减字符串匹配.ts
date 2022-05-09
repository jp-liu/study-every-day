/*
 * @lc app=leetcode.cn id=942 lang=typescript
 *
 * [942] 增减字符串匹配
 */

// @lc code=start
function diStringMatch(s: string): number[] {
  let left = 0,
    right = s.length
  let ans = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'I') {
      ans.push(left++)
    } else {
      ans.push(right--)
    }
  }
  ans.push(left)
  return ans
}
// @lc code=end
