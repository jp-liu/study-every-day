/*
 * @lc app=leetcode.cn id=640 lang=typescript
 *
 * [640] 求解方程
 */

// @lc code=start
function solveEquation(s: string): string {
  let x = 0,
    num = 0,
    n = s.length
  for (let i = 0, op = 1; i < n; ) {
    if (s[i] == '+') {
      op = 1
      i++
    } else if (s[i] == '-') {
      op = -1
      i++
    } else if (s[i] == '=') {
      x *= -1
      num *= -1
      op = 1
      i++
    } else {
      let j = i
      while (j < n && s[j] != '+' && s[j] != '-' && s[j] != '=') j++
      if (s[j - 1] == 'x')
        x += (i < j - 1 ? Number(s.substring(i, j - 1)) : 1) * op
      else num += Number(s.substring(i, j)) * op
      i = j
    }
  }
  if (x == 0) return num == 0 ? 'Infinite solutions' : 'No solution'
  else return 'x=' + num / -x
}

// @lc code=end
