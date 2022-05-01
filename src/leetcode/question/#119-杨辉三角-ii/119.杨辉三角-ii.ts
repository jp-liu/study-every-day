/*
 * @lc app=leetcode.cn id=119 lang=typescript
 *
 * [119] 杨辉三角 II
 */

// @lc code=start
function getRow(rowIndex: number): number[] {
  // rowIndex 从0开始, 所以 i<=rowIndex
  // 1.队列
  // const queue = [1, 0]
  // for (let i = 1; i <= rowIndex; i++) {
  //   let pre = 0
  //   while (true) {
  //     const item = queue.shift()
  //     if (item === 0) {
  //       queue.push(1, 0)
  //       break
  //     }
  //     let value = item + pre
  //     pre = item
  //     queue.push(value)
  //   }
  // }
  // queue.pop()
  // return queue

  // 2.动态规划
  const dp = []
  for (let i = 0; i <= rowIndex; i++) {
    dp[i] = new Array(i + 1)
    dp[i][0] = dp[i][i] = 1
    for (let j = 1; j < i; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1]
    }
  }
  return dp[rowIndex]
}
// @lc code=end
