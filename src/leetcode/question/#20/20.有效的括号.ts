/*
 * @lc app=leetcode.cn id=20 lang=typescript
 *
 * [20] 有效的括号
 */

// @lc code=start
function isValid(s: string): boolean {
  const map = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  const stack = []
  for (let i = 0; i < s.length; i++) {
    const item = s[i]
    if (item in map) {
      stack.push(item)
    } else {
      if (item !== map[stack.pop()]) return false
    }
    // switch (item) {
    //   case '(':
    //   case '[':
    //   case '{':
    //     stack.push(item)
    //     break
    //   case ')':
    //   case ']':
    //   case '}':
    //     if(item !== map[stack.pop()]) return false
    //     break
    // }
  }

  return !stack.length
}
// @lc code=end
