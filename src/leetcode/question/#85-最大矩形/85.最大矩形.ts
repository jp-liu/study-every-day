/*
 * @lc app=leetcode.cn id=85 lang=typescript
 *
 * [85] 最大矩形
 */

// @lc code=start
function maximalRectangle(matrix: string[][]): number {
  // 记录最高高度, 使用单调栈,确保高度的递增性
  // 当出现小与栈顶高度的时候,将其弹出,维持递增性,然后计算面积
  // 因为当出现小值,说明前面的面积相对于当前是大的
  const m = matrix.length
  const n = matrix[0].length
  const heights = new Array(n + 2).fill(0)

  let max = 0
  for (let i = 0; i < m; i++) {
    const stack = []
    for (let j = 0; j < n + 2; j++) {
      heights[j] =
        j > 0 && j <= matrix[i].length && matrix[i][j - 1] === '1'
          ? heights[j] + 1
          : 0
      while (stack.length && heights[j] < heights[stack[stack.length - 1]]) {
        max = Math.max(
          max,
          heights[stack.pop()] * (j - stack[stack.length - 1] - 1)
        )
      }
      stack.push(j)
    }
  }
  return max
}

// @lc code=end
console.log(
  maximalRectangle([
    ['1', '0', '1', '0', '0'],
    ['1', '0', '1', '1', '1'],
    ['1', '1', '1', '1', '1'],
    ['1', '0', '0', '1', '0']
  ])
)

function maximalRectangle1(matrix: string[][]): number {
  // 状态定义: dp[i][j] 表示 matrix[i][j] 点的矩形最大宽度
  // 动态转移方程: matrix[i][j] === 1  dp[i][j] = 1,  j > 0 dp[i][j] = dp[i][j-1] + 1
  const m = matrix.length
  const n = matrix[0].length
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))

  let max = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === '0') dp[i][j] = 0
      else {
        dp[i][j] = 1
        if (j > 0) {
          dp[i][j] = dp[i][j - 1] + 1
        }
        let width = dp[i][j]

        for (let k = i; k >= 0; k--) {
          width = Math.min(width, dp[k][j])
          if (width === 0) break
          max = Math.max(max, width * (i - k + 1))
        }
      }
    }
  }
  return max
}
