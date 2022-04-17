/*
 * @lc app=leetcode.cn id=509 lang=typescript
 *
 * [509] 斐波那契数
 */

// @lc code=start
function fib(n: number): number {
  // 解法一: 直接返回公式
  // if (n<=1) {
  //   return n
  // }
  // return fib(n - 1) + fib(n - 2)

  // 解法二: 动态规划
  let dp = [0, 1]
  // for (let i = 2; i <= n; i++) {
  //   dp[i] = dp[i - 1] + dp[i - 2]
  // }
  // return dp[n]

  // 解法三: 队列,近两个数的动态规划
  while (n >= 2) {
    const prev = dp.shift()
    const prevP = dp[0]
    dp.push(prev + prevP)
    n--
  }
  return n === 0 ? dp[0] : dp[1]
}
// @lc code=end
