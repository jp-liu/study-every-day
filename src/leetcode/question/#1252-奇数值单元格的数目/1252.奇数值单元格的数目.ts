/*
 * @lc app=leetcode.cn id=1252 lang=typescript
 *
 * [1252] 奇数值单元格的数目
 */

// @lc code=start
function oddCells(m: number, n: number, indices: number[][]): number {
  const mesh = new Array(m).fill(0).map(() => new Array(n).fill(0))

  for (const index of indices) {
    // 行: 当前行所有列都 + 1
    for (let i = 0; i < n; i++) {
      mesh[index[0]][i]++
    }
    // 列: 当前列的所有行都 + 1
    for (let i = 0; i < m; i++) {
      mesh[i][index[1]]++
    }
  }

  let ans = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mesh[i][j] & 1) {
        ans += 1
      }
    }
  }

  return ans
}
// @lc code=end

oddCells(2, 3, [
  [0, 1],
  [1, 1]
])
