/*
 * @lc app=leetcode.cn id=37 lang=typescript
 *
 * [37] 解数独
 */

// @lc code=start
/**
 Do not return anything, modify board in-place instead.
 */
function solveSudoku(board: string[][]): boolean {
  // 行
  for (let i = 0; i < 9; i++) {
    // 列
    for (let j = 0; j < 9; j++) {
      const num = board[i][j]
      if (num !== '.') {
        continue
      }
      // 开始放数字
      for (let k = 1; k <= 9; k++) {
        // 判断是否可以在当前位置放这个数字
        const v = k + ''
        if (isValid(board, i, j, v)) {
          board[i][j] = v
          // 放一个之后,继续放下一个
          if (solveSudoku(board)) {
            return true
          }
          // 如果防止错误,则弹出之前放的
          board[i][j] = '.'
        }
      }

      return false
    }
  }
  return true
}
function isValid(board: string[][], row: number, col: number, k: string) {
  // 当前行,列有没有这个数字
  for (let q = 0; q < 9; q++) {
    if (board[row][q] === k || board[q][col] === k) {
      return false
    }
  }
  // 对应第几个九宫格起点
  const x = ((row / 3) | 0) * 3
  const y = ((col / 3) | 0) * 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[x + i][y + j] === k) {
        return false
      }
    }
  }
  return true
}
solveSudoku([
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9']
])
// @lc code=end
