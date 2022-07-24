/*
 * @lc app=leetcode.cn id=1184 lang=typescript
 *
 * [1184] 公交站间的距离
 */

// @lc code=start
function distanceBetweenBusStops(
  distance: number[],
  start: number,
  destination: number
): number {
  let left = 0
  let right = 0
  const n = distance.length
  let i = start
  while (i !== destination) {
    left += distance[i]
    i = (i + 1) % n
  }
  i = start
  while (i !== destination) {
    right += distance[(i = (i - 1 + n) % n)]
  }
  return Math.min(left, right)
}
// @lc code=end

distanceBetweenBusStops([1, 2, 3, 4], 0, 1)
