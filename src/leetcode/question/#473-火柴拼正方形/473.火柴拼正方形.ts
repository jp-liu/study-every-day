/*
 * @lc app=leetcode.cn id=473 lang=typescript
 *
 * [473] 火柴拼正方形
 */

// @lc code=start
function makesquare(ms: number[]): boolean {
  // 使用回溯,拼凑四条边长
  const total = ms.reduce((a, b) => a + b)
  if (total % 4 !== 0) return false
  const edgeLength = total / 4
  // 为了回溯剪枝,排序数组
  ms.sort((a, b) => b - a)
  // 边长超出
  if (ms[0] > edgeLength) return false

  const edges = new Array(4).fill(0)

  return backtrack(0)

  function backtrack(idx: number) {
    if (idx === ms.length) return true
    for (let i = 0; i < 4; i++) {
      edges[i] += ms[idx]
      if (edges[i] <= edgeLength && backtrack(idx + 1)) return true
      edges[i] -= ms[idx] // 不符合要求的,回溯,进行下一轮演算
    }
    // 只有当四条边满足的情况下,才会返回true,其他时候,返回false
    return false
  }
}
// @lc code=end

makesquare([1, 1, 2, 2, 2])
