/*
 * @lc app=leetcode.cn id=1108 lang=typescript
 *
 * [1108] IP 地址无效化
 */

// @lc code=start
function defangIPaddr(address: string): string {
  let str = ''
  for (let i = 0; i < address.length; i++) {
    const s = address[i]
    if (s === '.') str += '['
    str += s
    if (str === '.') str += ']'
  }
  return str
}
// @lc code=end
