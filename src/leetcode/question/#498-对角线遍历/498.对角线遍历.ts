/*
 * @lc app=leetcode.cn id=498 lang=typescript
 *
 * [498] 对角线遍历
 */

// @lc code=start
function findDiagonalOrder(mat: number[][]): number[] {
  const m = mat.length
  const n = mat[0].length
  const ans = []

  let dir = true // true 向上，false 向下
  for (let i = 0; i < m + n; i++) {
    // 确定边界情况，
    // 方向向上，则i要小于m，也就是不能起点不能超过最大行
    // 方向向下，则i要小于n，也就是起点不能超过最大列
    let pm = dir ? m : n
    let pn = dir ? n : m

    let x = i < pm ? i : pm - 1
    let y = i - x
    while (x >= 0 && y < pn) {
      // 向上：行--
      // 向下：列--
      ans.push(dir ? mat[x][y] : mat[y][x])
      x--
      y++
    }
    dir = !dir
  }

  return ans
}
// @lc code=end

const res = findDiagonalOrder([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
])
console.log(res)

if (res.toString() === '1,2,3,4,5,6,7,8,9') {
  console.log('success')
}
