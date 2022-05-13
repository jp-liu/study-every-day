/*
 * @lc app=leetcode.cn id=91293 lang=typescript
 *
 * [面试题01.05] 一次编辑
 */

// @lc code=start
function oneEditAway(first: string, second: string): boolean {
  const fLen = first.length
  const sLen = second.length
  if (Math.abs(fLen - sLen) >= 2) return false
  // 短的在前面,指针就不需要判断,左右移动了
  if (fLen > sLen) return oneEditAway(second, first)
  let i = 0
  let j = 0
  let ans = 0
  while (i < fLen && j < sLen && ans < 2) {
    if (first[i] === second[j]) {
      i++
      j++
    } else {
      if (fLen === sLen) {
        i++
        j++
      } else {
        // second 是长字符串
        j++
      }
      ans++
    }
  }
  return ans < 2
}
// @lc code=end
