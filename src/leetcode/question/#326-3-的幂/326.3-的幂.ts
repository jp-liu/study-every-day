/*
 * @lc app=leetcode.cn id=326 lang=typescript
 *
 * [326] 3 的幂
 */

// @lc code=start
function isPowerOfThree(n: number): boolean {
  // 3的最大次幂 % n === 0的话,则证明 n 全部由 3 组成,也就是 3 的幂
  return n > 0 && 1162261467 % n === 0
}
// @lc code=end
