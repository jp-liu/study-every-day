/*
 * @lc app=leetcode.cn id=240 lang=typescript
 *
 * [240] 搜索二维矩阵 II
 */

// @lc code=start
function searchMatrix(matrix: number[][], target: number) {
  // 3.Z字型搜索
  // 每一行是递增关系，则存在最左侧元素大于右侧
  // 每一列是递增关系，则存在最上面元素小于下面
  // 我们从右上角开始搜索，
  // - 大于 target 时，则当前列下面肯定也大于
  // - 小于 target 时，则当前行左侧肯定也小于
  const m = matrix.length
  const n = matrix[0].length

  let i = 0,
    j = n - 1
  while (i < m && j >= 0) {
    const val = matrix[i][j]
    if (val > target) {
      j-- // 排除当前列
    } else if (val < target) {
      i++ // 排除当前行
    } else {
      return true
    }
  }
  return false
}
// @lc code=end
searchMatrix(
  [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
  ],
  5
)

function searchMatrix1(matrix: number[][], target: number): boolean {
  // 1、双重 for 循环
  for (const row of matrix) {
    for (const val of row) {
      if (val === target) return true
    }
  }
  return false
}

function searchMatrix2(matrix: number[][], target: number) {
  // 2.二分查找
  const m = matrix.length
  const n = matrix[0].length

  for (let i = 0; i < m; i++) {
    // 对每一行执行二分
    let left = 0,
      right = n - 1
    while (left <= right) {
      const mid = (left + right) >> 1
      if (matrix[i][mid] > target) {
        right = mid - 1
      } else if (matrix[i][mid] < target) {
        left = mid + 1
      } else {
        return true
      }
    }
  }
  return false
}
