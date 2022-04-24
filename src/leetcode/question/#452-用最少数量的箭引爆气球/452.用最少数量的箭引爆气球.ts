/*
 * @lc app=leetcode.cn id=452 lang=typescript
 *
 * [452] 用最少数量的箭引爆气球
 */

// @lc code=start
function findMinArrowShots(points: number[][]): number {
  // 1.左端排序
  points.sort((a, b) => a[0] - b[0])
  // 从第一根箭开始,就看去找第二根发射的地方
  let count = 1
  for (let i = 1; i < points.length; i++) {
    // 判断重叠部分
    // [1,6], [2,8] 2 < 6,所以他们存在重叠区间,不管,
    // 反之则不存在重叠,射后续的箭
    if (points[i][0] > points[i - 1][1]) {
      count++
    }
    // [2,8], [10,16]
    // 将16换成8,后面的元素求重叠的时候能用最小值判断,得到最优区间
    else {
      points[i][1] = Math.min(points[i][1], points[i - 1][1])
    }
  }
  return count
}
// @lc code=end
