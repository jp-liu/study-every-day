/*
 * @lc app=leetcode.cn id=79 lang=typescript
 *
 * [79] 单词搜索
 */

// @lc code=start
function exist(board: string[][], word: string): boolean {
  // 利用回溯,从当前点散发搜索后回归的特性,从起点,向上下左右四个方向查找,是否匹配
  if (!board.length) return false
  if (!word.length) return true

  const row = board.length
  const col = board[0].length
  // 行
  for (let i = 0; i < row; i++) {
    // 列
    for (let j = 0; j < col; j++) {
      // 0,从第一个字母开始查找
      const res = find(i, j, 0)
      if (res) return res
    }
  }
  return false

  // [i, j]当前在矩阵中的位置
  // cur,当前搜索第几个字母
  function find(i: number, j: number, cur: number): boolean {
    // 越界情况
    if (i >= row || i < 0) return false
    if (j >= col || j < 0) return false

    // 不相符则直接退出
    if (board[i][j] !== word[cur]) {
      return false
    }

    if (cur === word.length - 1) {
      return true
    }

    let temp = board[i][j]
    board[i][j] = null
    // 向四个方向分别查找,找到一个就行
    const res =
      find(i + 1, j, cur + 1) ||
      find(i - 1, j, cur + 1) ||
      find(i, j + 1, cur + 1) ||
      find(i, j - 1, cur + 1)
    board[i][j] = temp
    return res
  }
}
exist(
  [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E']
  ],
  'ABCCED'
)
// @lc code=end
