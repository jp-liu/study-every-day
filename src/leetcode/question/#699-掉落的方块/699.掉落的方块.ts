/*
 * @lc app=leetcode.cn id=699 lang=typescript
 *
 * [699] 掉落的方块
 */

// @lc code=start
function fallingSquares(ps: number[][]): number[] {
  // 一次一个方块进行运算,计算查找有相同交集的部分,去最大高度+当前方块长度=最新高度

  const sqInfos: { start: number; end: number; height: number }[] = []
  const ans: number[] = []
  let maxHeight = 0
  for (let i = 0; i < ps.length; i++) {
    const height = ps[i][1] // 边长
    const start = ps[i][0] // x 坐标起点
    const end = start + height // x 坐标重点

    let baseHeight = 0 // 交集的基础高度
    for (const sq of sqInfos) {
      // 擦边不算
      // [1, 1], [2,1] 和 [3, 1], [1, 1]
      if (start >= sq.end || end <= sq.start) continue
      // 在交集中去最大高度
      baseHeight = Math.max(baseHeight, sq.height)
    }
    // 获取最新高度
    baseHeight = baseHeight + height
    // 更新区间高度,作为下一次的基础高度
    sqInfos.push({ start, end, height: baseHeight })
    // 更新最高高度
    maxHeight = Math.max(maxHeight, baseHeight)
    ans.push(maxHeight)
  }
  return ans
}
// @lc code=end
fallingSquares([
  [1, 2],
  [2, 3],
  [6, 1]
])
