/*
 * @lc app=leetcode.cn id=150 lang=typescript
 *
 * [150] 逆波兰表达式求值
 */

// @lc code=start
function evalRPN(tokens: string[]): number {
  const stack: number[] = []
  const calculator = {
    '+': (a: number, b: number) => a + b,
    '-': (a: number, b: number) => b - a,
    '*': (a: number, b: number) => a * b,
    '/': (a: number, b: number) => (b / a) | 0 // | 0 是取整,位上没有小数位,所以|0,小数就没了
  }
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]
    if (t in calculator) {
      stack.push(calculator[t](stack.pop(), stack.pop()))
    } else {
      stack.push(+t)
    }
  }
  return stack.pop()
}
// @lc code=end
