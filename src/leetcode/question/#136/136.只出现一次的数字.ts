/*
 * @lc app=leetcode.cn id=136 lang=typescript
 *
 * [136] 只出现一次的数字
 */

// @lc code=start
function singleNumber(nums: number[]): number {
  // 1.按位 `^` 相同数字则为0
  // 001     001
  // 001     010
  // 000     011
  let ret = 0
  nums.forEach(item => {
    ret ^= item
  })
  return ret
}
// @lc code=end
