/*
 * @lc app=leetcode.cn id=198 lang=typescript
 *
 * [198] 打家劫舍
 */

// @lc code=start
function rob(nums: number[]): number {
  // 相邻两家不能一起偷,就只能找其中一家钱最多的
  // dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
  const dp = [nums[0], Math.max(nums[0], nums[1])]
  for (let i = 2; i < nums.length; i++) {
    // 如果当前两家加起来没有中间一家多,那么就去中间那家,这两家都放弃
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
  }
  return dp[nums.length - 1]
}
// @lc code=end
