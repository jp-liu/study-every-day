/*
 * @lc app=leetcode.cn id=45 lang=typescript
 *
 * [45] 跳跃游戏 II
 */

// @lc code=start
function jump(nums: number[]): number {
  // 记录达到终点所需的次数
  let step = 0
  let cover = 0 // 记录当前最大可跳跃距离
  let end = 0 // 记录当前可以达到的最远处边界
  for (let i = 0; i < nums.length - 1; i++) {
    cover = Math.max(cover, i + nums[i])
    // i === end, 证明已经走到了上一步可以达到的最远处边界
    // 重新获取下一次可到达的边界
    if (i === end) {
      end = cover
      step++
    }
  }
  return step
}
jump([2, 3, 1, 1, 4])
// @lc code=end
