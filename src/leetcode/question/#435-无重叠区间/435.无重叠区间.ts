/*
 * @lc app=leetcode.cn id=435 lang=typescript
 *
 * [435] 无重叠区间
 */

// @lc code=start
function eraseOverlapIntervals(intervals: number[][]): number {
  intervals.sort((a, b) => a[1] - b[1])
  let end = intervals[0][1]
  let count = 1
  for (let i = 1; i < intervals.length; i++) {
    // 起点大于等于之前的终点,说明开始第二段区间了
    if (intervals[i][0] >= end) {
      count++
      end = intervals[i][1]
    }
  }
  return intervals.length - count
}
// @lc code=end
