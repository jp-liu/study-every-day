/*
 * @lc app=leetcode.cn id=746 lang=typescript
 *
 * [746] 使用最小花费爬楼梯
 */

// @lc code=start
function minCostClimbingStairs(cost: number[]): number {
  // 一次一到两个台阶
  // 那么就是在1-2之间寻找一个价格少的进行爬楼梯
  // dp[i] = Math.min(dp[i - 1], dp[i - 2])
  const dp = [cost[0], cost[1]]
  for (let i = 2; i < cost.length; i++) {
    dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i]
  }
  // 判断最后一步,走一步还是两步是最优解
  return Math.min(dp[cost.length - 1], dp[cost.length - 2])
}
// @lc code=end
