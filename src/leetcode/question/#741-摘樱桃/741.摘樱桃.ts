/*
 * @lc app=leetcode.cn id=741 lang=typescript
 *
 * [741] 摘樱桃
 */

// @lc code=start
function cherryPickup(grid: number[][]) {
  const n = grid.length
  const f = new Array(n * 2 - 1)
    .fill(0)
    .map(() =>
      new Array(n).fill(0).map(() => new Array(n).fill(-Number.MAX_VALUE))
    )
  f[0][0][0] = grid[0][0]
  for (let k = 1; k < n * 2 - 1; ++k) {
    for (let x1 = Math.max(k - n + 1, 0); x1 <= Math.min(k, n - 1); ++x1) {
      const y1 = k - x1
      if (grid[x1][y1] === -1) {
        continue
      }
      for (let x2 = x1; x2 <= Math.min(k, n - 1); ++x2) {
        let y2 = k - x2
        if (grid[x2][y2] === -1) {
          continue
        }
        let res = f[k - 1][x1][x2] // 都往右
        if (x1 > 0) {
          res = Math.max(res, f[k - 1][x1 - 1][x2]) // 往下，往右
        }
        if (x2 > 0) {
          res = Math.max(res, f[k - 1][x1][x2 - 1]) // 往右，往下
        }
        if (x1 > 0 && x2 > 0) {
          res = Math.max(res, f[k - 1][x1 - 1][x2 - 1]) // 都往下
        }
        res += grid[x1][y1]
        if (x2 !== x1) {
          // 避免重复摘同一个樱桃
          res += grid[x2][y2]
        }
        f[k][x1][x2] = res
      }
    }
  }
  return Math.max(f[n * 2 - 2][n - 1][n - 1], 0)
}
// @lc code=end

cherryPickup([
  [1, 1, -1],
  [1, -1, 1],
  [-1, 1, 1]
])
