/*
 * @lc app=leetcode.cn id=757 lang=typescript
 *
 * [757] 设置交集大小至少为2
 */

// @lc code=start
function intersectionSizeTwo(intervals: number[][]): number {
  intervals.sort((a, b) => {
    if (a[1] != b[1]) {
      return a[1] - b[1]
    }
    return b[0] - a[0]
  })
  let a = -1,
    b = -1,
    ans = 0
  for (const [left, right] of intervals) {
    if (left > b) {
      a = right - 1
      b = right
      ans += 2
    } else if (left > a) {
      a = b
      b = right
      ans++
    }
  }
  return ans
}
// @lc code=end
