/*
 * @lc app=leetcode.cn id=1021 lang=typescript
 *
 * [1021] 删除最外层的括号
 */

// @lc code=start
function removeOuterParentheses(s: string): string {
  // 原语: 无法被继续拆分的括号组, 如 (())   ()
  // 非原语: ()() 可以被拆分成为 () + ()
  // 找出原语删除最外层括号
  let count = 0
  let ans = ''
  for (const str of s) {
    if (str === ')') count--
    if (count !== 0) ans += str
    if (str === '(') count++
  }
  return ans
}
// @lc code=end

function removeOuterParentheses1(s: string): string {
  // 原语: 无法被继续拆分的括号组, 如 (())   ()
  // 非原语: ()() 可以被拆分成为 () + ()
  // 找出原语删除最外层括号
  const stack = []
  let ans = ''
  for (const str of s) {
    if (str === ')') stack.pop()
    if (stack.length) ans += str
    if (str === '(') stack.push(str)
  }
  return ans
}
