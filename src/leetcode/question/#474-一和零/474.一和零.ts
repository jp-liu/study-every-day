/*
 * @lc app=leetcode.cn id=474 lang=typescript
 *
 * [474] 一和零
 */

// @lc code=start
function findMaxForm(strs: string[], m: number, n: number): number {
  // 状态: dp[i][j][k] 表示第 i 个字符串,取 j 个 0, k 个 1,是否满足条件
  const len = strs.length
  const dp = new Array(len + 1)
    .fill(0)
    .map(() => new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0)))

  for (let i = 1; i <= len; i++) {
    const { m: cnt0, n: cnt1 } = getCnt(strs[i - 1])
    for (let j = 0; j <= m; j++) {
      for (let k = 0; k <= n; k++) {
        dp[i][j][k] = dp[i - 1][j][k]
        // 如果j<cnt0,说明当前字符串0过多,无法满足条件,就用上一个就行
        if (j < cnt0) continue
        // 同理
        if (k < cnt1) continue
        // 这里是满足 m, n 条件的, j-cnt0 用掉了cnt0个0,还剩余几个0的对应, k-cnt1使用掉了几个一的对应
        dp[i][j][k] = Math.max(dp[i][j][k], dp[i - 1][j - cnt0][k - cnt1] + 1)
      }
    }
  }
  return dp[len][m][n]
}

function getCnt(str: string) {
  let m = 0,
    n = 0
  for (const s of str) s === '0' ? m++ : n++
  return { m, n }
}
// @lc code=end
