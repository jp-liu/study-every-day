/*
 * @lc app=leetcode.cn id=592 lang=typescript
 *
 * [592] 分数加减运算
 */

// @lc code=start
function fractionAddition(s: string): string {
  const n = s.length
  let ans = ''
  for (let i = 0; i < n; ) {
    let j = i + 1
    while (j < n && s[j] != '+' && s[j] != '-') j++
    let num = s.substring(i, j)
    if (s[i] != '+' && s[i] != '-') num = '+' + num
    if (ans != '') ans = calc(num, ans)
    else ans = num
    i = j
  }
  return ans[0] == '+' ? ans.substring(1) : ans
}
function calc(a: string, b: string): string {
  const fa = a[0] == '+',
    fb = b[0] == '+'
  if (!fa && fb) return calc(b, a)
  const p = parse(a),
    q = parse(b)
  const p1 = p[0] * q[1],
    q1 = q[0] * p[1]
  if (fa && fb) {
    const r1 = p1 + q1,
      r2 = p[1] * q[1],
      c = gcd(r1, r2)
    return '+' + r1 / c + '/' + r2 / c
  } else if (!fa && !fb) {
    const r1 = p1 + q1,
      r2 = p[1] * q[1],
      c = gcd(r1, r2)
    return '-' + r1 / c + '/' + r2 / c
  } else {
    const r1 = p1 - q1,
      r2 = p[1] * q[1],
      c = gcd(Math.abs(r1), r2)
    let ans = r1 / c + '/' + r2 / c
    if (p1 > q1) ans = '+' + ans
    return ans
  }
}
function parse(s: string): number[] {
  let n = s.length,
    idx = 1
  while (idx < n && s[idx] != '/') idx++
  const a = Number(s.substring(1, idx)),
    b = Number(s.substring(idx + 1))
  return [a, b]
}
function gcd(a: number, b: number): number {
  return b == 0 ? a : gcd(b, a % b)
}

// @lc code=end
