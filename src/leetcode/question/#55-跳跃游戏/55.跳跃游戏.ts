/*
 * @lc app=leetcode.cn id=55 lang=typescript
 *
 * [55] 跳跃游戏
 */

// @lc code=start
function canJump(nums: number[]): boolean {
  // 只要能当前元素+下标 >= length - 1,则可以达到
  let cover = 0
  for (let i = 0; i <= cover; i++) {
    cover = Math.max(cover, i + nums[i])
    if (cover >= nums.length - 1) {
      return true
    }
  }
  return false
}
// @lc code=end
