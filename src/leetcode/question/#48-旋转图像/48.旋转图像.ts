/*
 * @lc app=leetcode.cn id=48 lang=typescript
 *
 * [48] 旋转图像
 */

// @lc code=start
/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
  // 1.先沿着左上到右下对角线交换位置, 然后在中心线左右交换位置
  const n = matrix.length
  // 对角线交换
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      ;[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }

  // 中线交换
  // 行
  for (let i = 0; i < n; i++) {
    // 双指针,头和尾
    for (let j = 0, k = n - 1; j < k; j++, k--) {
      ;[matrix[i][j], matrix[i][k]] = [matrix[i][k], matrix[i][j]]
    }
  }
}
// @lc code=end
