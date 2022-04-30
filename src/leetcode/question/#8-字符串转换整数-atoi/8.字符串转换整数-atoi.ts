/*
 * @lc app=leetcode.cn id=8 lang=typescript
 *
 * [8] 字符串转换整数 (atoi)
 */

// @lc code=start
function myAtoi(s: string): number {
  const len = s.length
  let index = 0
  // 去除前置空格
  while (index < len && s[index] === ' ') {
    index++
  }
  if (index === len) return 0

  // 判断符号位
  let flag = 0
  if (s[index] === '+' && flag === 0) {
    index++
    flag = 1
  }
  if (s[index] === '-' && flag === 0) {
    index++
    flag = -1
  }
  if (flag === 0) {
    flag = 1
  }

  // 依次处理数字
  let ans = 0
  while (index < len) {
    const curNum = s[index]
    if (!/[0-9]/.test(curNum)) {
      break
    }
    // 判断是否越界
    if (ans > 214748364 || (ans === 214748364 && +curNum > 7)) {
      return 2147483647
    }
    if (ans < -214748364 || (ans === -214748364 && +curNum > 8)) {
      return -2147483648
    }
    ans = ans * 10 + flag * +curNum
    index++
  }
  return ans
}
// @lc code=end
