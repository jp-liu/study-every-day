/*
 * @lc app=leetcode.cn id=279 lang=typescript
 *
 * [279] 完全平方数
 */

// @lc code=start
function numSquares(n: number): number {
  const dp = new Array(n + 1).fill(0)
  for (let i = 1; i <= n; i++) {
    dp[i] = i
    // 保证是一个完全平方数作为值
    for (let j = 1; j * j <= i; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1)
    }
  }
  return dp[n]
}
// @lc code=end
console.log(numSquares(18))

function numSquares1(n: number): number {
  if (isSqrt(n)) return 1
  const dp = new Array(n + 1).fill(Infinity)
  for (let i = 1; i <= n; i++) {
    if (isSqrt(i)) {
      dp[i] = 1
      continue
    }
    // 保证是一个完全平方数作为值
    for (let j = 1, sq = 1; j < i && sq < i; ++j, sq = j * j) {
      dp[i] = Math.min(dp[i], dp[i - sq] + 1)
    }
  }
  return dp[n]
}

function isSqrt(x: number) {
  const v = Math.sqrt(x)
  return !String(v).includes('.')
}
