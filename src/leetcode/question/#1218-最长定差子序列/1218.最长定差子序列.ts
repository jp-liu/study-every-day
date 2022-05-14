/*
 * @lc app=leetcode.cn id=1218 lang=typescript
 *
 * [1218] 最长定差子序列
 */

// @lc code=start
function longestSubsequence(arr: number[], difference: number): number {
  // 递推状态: dp[i] 是第i位数字的等差序列长度
  // 动态转移方程: dp[arr[i] - diff] + 1
  const dp: number[] = []
  let ans = 0
  for (const val of arr) {
    if (!dp[val - difference]) {
      dp[val] = 1
    } else {
      dp[val] = dp[val - difference] + 1
    }
    ans = Math.max(ans, dp[val])
  }
  return ans
}
// @lc code=end
