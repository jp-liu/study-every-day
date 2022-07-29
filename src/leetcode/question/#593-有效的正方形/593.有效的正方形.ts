/*
 * @lc app=leetcode.cn id=593 lang=typescript
 *
 * [593] 有效的正方形
 */

// @lc code=start
let len = -1
function validSquare(
  a: number[],
  b: number[],
  c: number[],
  d: number[]
): boolean {
  len = -1
  return calc(a, b, c) && calc(a, b, d) && calc(a, c, d) && calc(b, c, d)
}
function calc(a: number[], b: number[], c: number[]): boolean {
  const l1 = (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])
  const l2 = (a[0] - c[0]) * (a[0] - c[0]) + (a[1] - c[1]) * (a[1] - c[1])
  const l3 = (b[0] - c[0]) * (b[0] - c[0]) + (b[1] - c[1]) * (b[1] - c[1])
  const ok =
    (l1 == l2 && l1 + l2 == l3) ||
    (l1 == l3 && l1 + l3 == l2) ||
    (l2 == l3 && l2 + l3 == l1)
  if (!ok) return false
  if (len == -1) len = Math.min(l1, l2)
  else if (len == 0 || len != Math.min(l1, l2)) return false
  return true
}

// @lc code=end
