/*
 * @lc app=leetcode.cn id=1646 lang=typescript
 *
 * [1646] 获取生成数组中的最大值
 */

// @lc code=start
function getMaximumGenerated(n: number): number {
  if (n == 0) return 0
  const nums = []
  nums[0] = 0
  nums[1] = 1
  for (let i = 0; i < n; i++) {
    // 按照题目规则生成,然后获取最大的数即可
    if (2 * i <= n) nums[2 * i] = nums[i]
    if (2 * i + 1 <= n) nums[2 * i + 1] = nums[i] + nums[i + 1]
  }

  return Math.max(...nums)
}
// @lc code=end
