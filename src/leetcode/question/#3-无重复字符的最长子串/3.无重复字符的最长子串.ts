/*
 * @lc app=leetcode.cn id=3 lang=typescript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
function lengthOfLongestSubstring(s: string): number {
  // 利用双指针滑动窗口进行滑动
  let str = '' // 相当于当前窗口
  let ans = 0
  for (let i = 0, j = 0; i < s.length; i++) {
    const t = s[i]
    // 如果当前含有元素,则说明重复,重新计算最长子串
    if (str.indexOf(t) > -1) {
      i = j
      j++
      str = ''
    } else {
      // 不含有则计算加上当前串
      str += t
    }
    ans = Math.max(ans, str.length)
  }
  return ans
}
// @lc code=end
