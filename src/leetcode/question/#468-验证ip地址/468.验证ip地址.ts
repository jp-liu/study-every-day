/*
 * @lc app=leetcode.cn id=468 lang=typescript
 *
 * [468] 验证IP地址
 */

// @lc code=start
function validIPAddress(queryIP: string): string {
  if (~queryIP.indexOf('.') && check4(queryIP.split('.'))) return 'IPv4'
  if (~queryIP.indexOf(':') && check6(queryIP.split(':'))) return 'IPv6'
  return 'Neither'
}

function check4(ip: string[]): boolean {
  if (ip.length !== 4) return false
  for (const s of ip) {
    if (
      s.length > 3 ||
      s.length == 0 ||
      (s.length > 1 && s.charCodeAt(0) == '0'.charCodeAt(0))
    ) {
      return false
    }
    let cur = 0
    for (let i = 0; i < s.length; i++) {
      if (
        s.charCodeAt(i) <= '9'.charCodeAt(0) &&
        s.charCodeAt(i) >= '0'.charCodeAt(0)
      ) {
        cur = 10 * cur + s.charCodeAt(i) - '0'.charCodeAt(0)
      } else {
        return false
      }
    }
    if (cur > 255) {
      return false
    }
  }
  return true
}

function check6(ip: string[]): boolean {
  if (ip.length !== 8) return false
  for (const val of ip) {
    if (val === '') return false
    if (val.length < 1 || val.length > 4) return false
    for (let s of val) {
      const c = s.charCodeAt(0)
      if (
        !(
          ('0'.charCodeAt(0) <= c && c <= '9'.charCodeAt(0)) ||
          ('a'.charCodeAt(0) <= c && 'f'.charCodeAt(0) >= c) ||
          ('A'.charCodeAt(0) <= c && c <= 'F'.charCodeAt(0))
        )
      )
        return false
    }
  }
  return true
}
// @lc code=end

console.log(validIPAddress('2001:0db8:85a3:0:0:8A2E:0370:7334'))
