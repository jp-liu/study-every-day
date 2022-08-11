/*
 * @lc app=leetcode.cn id=1417 lang=typescript
 *
 * [1417] 重新格式化字符串
 */

// @lc code=start
function reformat(s: string): string {
  let a = '',
    b = ''
  for (let i = 0; i < s.length; i++) {
    if (s[i] >= 'a') a += s[i]
    else b += s[i]
  }
  let n = a.length,
    m = b.length,
    tot = n + m
  if (Math.abs(n - m) > 1) return ''
  let ans = ''
  while (ans.length < tot) {
    if (n < m) ans += b[--m]
    else if (n > m) ans += a[--n]
    else {
      if (ans.length != 0 && ans[ans.length - 1] >= 'a') ans += b[--m]
      else ans += a[--n]
    }
  }
  return ans
}

// @lc code=end
