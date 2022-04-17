/*
 * @lc app=leetcode.cn id=455 lang=typescript
 *
 * [455] 分发饼干
 */

// @lc code=start
function findContentChildren(g: number[], s: number[]): number {
  // 从大到小分配,尽可能满足
  g.sort((a, b) => a - b)
  s.sort((a, b) => a - b)
  let index = s.length - 1
  let ans = 0
  for (let i = g.length - 1; i >= 0; i--) {
    if (g[i] && s[index] && s[index] >= g[i]) {
      index--
      ans++
    }
    if (index < 0) break
  }
  return ans
}
findContentChildren([1, 2, 3], [1, 1])
// @lc code=end
