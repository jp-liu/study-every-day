/*
 * @lc app=leetcode.cn id=69 lang=typescript
 *
 * [69] x 的平方根
 */

// @lc code=start
function mySqrt(x: number): number {
  // 平方根,就是 x 开根号,一个数的平方根肯定是 1 到 (x/2)的数
  let left = 0
  let right = x
  while (left <= right) {
    const mid = left + ((right - left) >> 1)
    // 平方太大,缩小
    if (mid * mid > x) {
      right = mid - 1
    }
    // 平方太小,扩大
    else if (mid * mid <= x) {
      left = mid + 1
    }
  }
  return right
}
mySqrt(4)
// @lc code=end
