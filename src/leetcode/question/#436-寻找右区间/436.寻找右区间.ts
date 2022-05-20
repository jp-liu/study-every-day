/*
 * @lc app=leetcode.cn id=436 lang=typescript
 *
 * [436] 寻找右区间
 */

// @lc code=start
function findRightInterval(intervals: number[][]): number[] {
  // 每一个start起点不一致,对起点进行排序,进行二分查找即可
  // 记录右区间起点,保留下标位置
  const n = intervals.length
  const startIndex = new Array(n).fill(0).map(() => new Array(2).fill(0))
  for (let i = 0; i < n; i++) {
    startIndex[i][0] = intervals[i][0]
    startIndex[i][1] = i
  }
  startIndex.sort((a, b) => a[0] - b[0])
  const ans = new Array(n).fill(-1)
  for (let i = 0; i < n; i++) {
    let left = 0
    let right = n
    while (left < right) {
      const mid = (left + right) >> 1
      // 起点小于结尾区间,向右缩小区间,否则向左缩小区间
      if (startIndex[mid][0] < intervals[i][1]) left = mid + 1
      else right = mid
    }
    if (left < n) ans[i] = startIndex[left][1]
  }
  return ans
}
// @lc code=end
