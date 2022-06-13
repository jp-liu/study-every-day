/*
 * @lc app=leetcode.cn id=926 lang=typescript
 *
 * [926] 将字符串翻转到单调递增
 */

// @lc code=start
function minFlipsMonoIncr(s: string): number {
  // 状态定义：和买卖股票的问题一样，dp[i][0] 当前位以及之前都是0的最小次数
  //                            dp[i][1] 当前位是1的单调递增，则之前是0或者1都行，求个最小值
  let dp_i_0 = 0
  let dp_i_1 = 0
  for (const str of s) {
    dp_i_1 = Math.min(dp_i_1, dp_i_0) + (1 - +str) // 1-0=1  1-1=0
    dp_i_0 += +str - 0
  }
  return Math.min(dp_i_0, dp_i_1)
}
// @lc code=end
