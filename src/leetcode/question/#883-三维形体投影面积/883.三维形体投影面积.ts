/*
 * @lc app=leetcode.cn id=883 lang=typescript
 *
 * [883] 三维形体投影面积
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
function projectionArea(grid: number[][]) {
  // 1.gird是一个 n x n 的网格, 代表 XY ,堆放 立方体
  // grid[0] => 对应列
  // grid[0][0] => 第一列第一个堆了几个立方体
  // grid[0][1] => 第一列第二个堆了几个立方体
  // 俯视图,就是网格中,放了立方体的格子数量
  // 正视图,每一列中最高元素值相加
  // 侧视图,每一行中最高元素值相加
  const m = grid.length // 列
  const n = grid[0].length // 行
  let xy = 0,
    yz = 0,
    zx = 0
  for (let i = 0; i < m; i++) {
    let yzHeight = 0,
      zxHeight = 0
    for (let j = 0; j < n; j++) {
      xy += grid[i][j] !== 0 ? 1 : 0
      // 正视图:
      // grid[i] 当前列
      // grid[i][j] 当前列 第 j 行,堆放几个元素,取一个最高的
      zxHeight = Math.max(zxHeight, grid[i][j])
      // 侧视图
      // grid[j] 每一列
      // grid[j][i] 每列  当前行的堆放元素
      yzHeight = Math.max(yzHeight, grid[j][i])
    }
    yz += yzHeight
    zx += zxHeight
  }
  return xy + zx + yz
}
// @lc code=end
