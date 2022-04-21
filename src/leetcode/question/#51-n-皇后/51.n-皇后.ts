/*
 * @lc app=leetcode.cn id=51 lang=typescript
 *
 * [51] N 皇后
 */

// @lc code=start
function solveNQueens(n: number): string[][] {
  const ans: string[][] = []
  backtrack(0, [])
  return ans
  function backtrack(row: number /* 行号 */, temp: number[] /* 列的位置 */) {
    if (row === n) {
      ans.push(
        temp.map(item => {
          const arr: string[] = new Array(n).fill('.')
          arr[item] = 'Q'
          return arr.join('')
        })
      )
      return
    }
    /**
     * row 行号
     * col 列
     */
    for (let col = 0; col < n; col++) {
      // c是列,r是行,r是index,temp有几个元素,说明第几次进度递归,也就是第几行
      const notSet = temp.some((c, r) => {
        return c === col || r + c === row + col || r - c === row - col
      })
      if (notSet) {
        continue
      }
      // 系统栈帮助我们做了入栈和出栈的操作
      backtrack(row + 1, [...temp, col])
    }
  }
}
// @lc code=end
