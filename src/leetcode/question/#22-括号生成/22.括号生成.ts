/*
 * @lc app=leetcode.cn id=22 lang=typescript
 *
 * [22] 括号生成
 */

// @lc code=start
function generateParenthesis(n: number): string[] {
  // 1.n对括号,那么每一项结果长度 2n(括号成对出现)
  // 2.什么时候＋左括号,什么时候＋右括号
  // 2.1 类似全排列,这里我们记录左右括号的数量,有效括号的左括号一定大于等于有括号的数量
  // 回溯,全排列,当符合有效括号的条件的时候,则加入结果
  const ans: string[] = []
  backtrack(n, 0, 0, '')
  return ans

  function backtrack(n: number, lc: number, rc: number, path: string) {
    // 左右括号齐全的时候,加入结果
    if (lc === n && rc === n) {
      ans.push(path)
    }
    // 没满足,则继续添加括号操作
    else {
      // 添加左右括号
      if (lc < n) backtrack(n, lc + 1, rc, path + '(')
      if (lc > rc && rc < n) backtrack(n, lc, rc + 1, path + ')')
    }
  }
}
// @lc code=end
