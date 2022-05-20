/*
 * @lc app=leetcode.cn id=462 lang=typescript
 *
 * [462] 最少移动次数使数组元素相等 II
 */

// @lc code=start
function minMoves2(nums: number[]): number {
  nums.sort((a, b) => a - b)
  // 中位数问题
  // 数组元素每一项到达中位数的操作很明显是最少的
  // 所有值到达最大值,和所有值到达最小值,都会浪费相对于中位数一半的次数
  const mid = nums[(nums.length >> 1) | 0] // 奇数为中间.偶数中间两位任选其一即可
  let ans = 0
  for (const num of nums) {
    ans += Math.abs(mid - num)
  }
  return ans
}
// @lc code=end
