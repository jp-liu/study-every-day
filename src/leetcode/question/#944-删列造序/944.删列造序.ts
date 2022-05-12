/*
 * @lc app=leetcode.cn id=944 lang=typescript
 *
 * [944] 删列造序
 */

// @lc code=start
function minDeletionSize(strs: string[]): number {
  if (strs.length <= 1) return 0
  let res = 0
  const sLen = strs[0].length
  for (let i = 0; i < sLen; i++) {
    for (let j = 1; j < strs.length; j++) {
      // 比上一位小,则不是升序,则列数+1,结束当前列循环,进入下一列
      if (strs[j].charCodeAt(i) < strs[j - 1].charCodeAt(i)) {
        res++
        break
      }
    }
  }
  return res
}
// @lc code=end
