/*
 * @lc app=leetcode.cn id=1331 lang=typescript
 *
 * [1331] 数组序号转换
 */

// @lc code=start
function arrayRankTransform(arr: number[]): number[] {
  const clone = arr.slice()
  clone.sort((a, b) => a - b)
  let n = clone.length,
    idx = 0

  const map = new Map()
  for (const v of clone) {
    if (!map.has(v)) map.set(v, ++idx)
  }

  const ans: number[] = []
  for (let i = 0; i < arr.length; i++) ans.push(map.get(arr[i]))
  return ans
}
// @lc code=end

arrayRankTransform([100, 100, 100])
