/*
 * @lc app=leetcode.cn id=674 lang=typescript
 *
 * [674] 最长连续递增序列
 */

// @lc code=start
function findLengthOfLCIS(nums: number[]): number {
  // 动态规划
  // dp[i] =
  // const dp: number[] = new Array(nums.length).fill(1)
  // for (let i = 0; i < nums.length - 1; i++) {
  //   if (nums[i + 1] > nums[i]) {
  //     dp[i + 1] = dp[i] + 1
  //   }
  // }
  // return Math.max(...dp)
  const dp = new Array(nums.length).fill(1)
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1
    }
  }
  return Math.max(...dp)
}
// @lc code=end
