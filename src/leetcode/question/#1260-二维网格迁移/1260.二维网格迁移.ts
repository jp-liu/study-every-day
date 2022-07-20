/*
 * @lc app=leetcode.cn id=1260 lang=typescript
 *
 * [1260] 二维网格迁移
 */

// @lc code=start
function shiftGrid(grid: number[][], k: number): number[][] {
  const m = grid.length
  const n = grid[0].length
  const t = k % (m * n)
  for (let i = 0; i < t; i++) {
    shift(grid, m, n)
  }

  return grid
}

function shift(grid: number[][], m: number, n: number) {
  const last = grid[m - 1][n - 1]
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (j === 0 && i !== 0) {
        grid[i][j] = grid[i - 1][n - 1]
      } else if (i === 0 && j === 0) {
        grid[i][j] = last
      } else {
        grid[i][j] = grid[i][j - 1]
      }
    }
  }
}
// @lc code=end

shiftGrid(
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ],
  1
)
