/*
 * @lc app=leetcode.cn id=494 lang=typescript
 *
 * [494] 目标和
 */

// @lc code=start
function findTargetSumWays(nums: number[], target: number): number {
  // 1.递推状态 f[i][j] 表示使用前 i 个数字,能组合到 j 的方法总数
  // 2.递推公式 f[i][j] = f[i - 1][j - nums[i]] || f[i - 1][j + nums[i]]
  const n = nums.length
  const f = new Array(n + 1).fill(0).map(() => [])
  f[0][0] = 1
  for (let i = 1, sum = 0; i <= n; i++) {
    const v = nums[i - 1]
    // j 的范围,是前面所有数相加,或者相减的区间
    sum += v
    for (let j = -sum; j <= sum; j++) {
      f[i][j] = (f[i - 1][j - v] || 0) + (f[i - 1][j + v] || 0)
    }
  }
  return f[n][target] || 0
}
// @lc code=end
