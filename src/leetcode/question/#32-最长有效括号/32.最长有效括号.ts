/*
 * @lc app=leetcode.cn id=32 lang=typescript
 *
 * [32] 最长有效括号
 */

// @lc code=start
function longestValidParentheses(s: string): number {
  // 1.使用栈进行操作
  // 2.使用动态规划, dp[i][j] 表示 s[i - j] 是否是有效的括号字符串, 然后用 max 计算长度最长的
  // 状态定义: dp[i] 表示以i结尾的字符串的最长有效括号子串长度
  const len = s.length
  if (len < 2) return 0

  const dp = new Array(len + 1).fill(0)
  const stack = []
  for (let i = 1; i <= len; i++) {
    const str = s[i - 1]
    if (str === '(') {
      stack.push(i) // 记录下标
      dp[i] = 0 // 单左括号不可能是有效的
    } else {
      if (stack.length) {
        let left = stack.pop() // 取出对应的左括号的下标
        let length = i - left + 1 + dp[left - 1] // 当前加上之前的有效括号
        dp[i] = length
      } else {
        dp[i] = 0
      }
    }
  }
  return Math.max(...dp)
}
// @lc code=end

console.log(longestValidParentheses('()(())'))
console.log(longestValidParentheses(')()())'))
console.log(longestValidParentheses('()(()'))
console.log(longestValidParentheses('(()'))
console.log(longestValidParentheses('(())()'))
