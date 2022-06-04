/*
 * @lc app=leetcode.cn id=929 lang=typescript
 *
 * [929] 独特的电子邮件地址
 */

// @lc code=start
function numUniqueEmails(emails: string[]): number {
  const result = new Set()
  for (let i = 0; i < emails.length; i++) {
    result.add(email(emails[i]))
  }
  return result.size
}

function email(email: string) {
  const strs = email.split('@')
  const sLen = strs[0].length
  let s = strs[0]
  let res = ''
  for (let i = 0; i < sLen; i++) {
    if (s[i] === '+') {
      return `${res}@${strs[1]}`
    } else if (s[i] !== '.') {
      res += s[i]
    }
  }
  return `${res}@${strs[1]}`
}
// @lc code=end
