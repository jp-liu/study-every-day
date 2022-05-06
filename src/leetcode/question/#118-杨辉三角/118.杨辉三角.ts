/*
 * @lc app=leetcode.cn id=118 lang=typescript
 *
 * [118] 杨辉三角
 */

// @lc code=start
function generate(numRows: number): number[][] {
  // 动态规划
  // if (numRows === 1) return [[1]]
  // if (numRows === 2) return [[1], [1, 1]]
  // const dp = []
  // for (let i = 0; i < numRows; i++) {
  //   dp[i] = new Array(i + 1)
  //   dp[i][0] = dp[i][i] = 1
  //   for (let j = 1; j < i; j++) {
  //     dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1]
  //   }
  // }
  // return dp
  const queue = [1]
  const ans = [[1]]
  // 从第一层开始
  for (let i = 1; i < numRows; i++) {
    let pre = 0
    for (let j = 0; j < i; j++) {
      // 从当前层计算下一层的数据
      const val = queue.shift()
      const value = val + pre
      queue.push(value)
      pre = val
    }
    queue.push(1)
    ans.push([...queue])
  }
  return ans
}
// @lc code=end
