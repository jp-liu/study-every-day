/*
 * @lc app=leetcode.cn id=1051 lang=typescript
 *
 * [1051] 高度检查器
 */

// @lc code=start
function heightChecker(heights: number[]): number {
  const expected = heights.slice().sort((a, b) => a - b)

  let ans = 0
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] !== expected[i]) ans++
  }
  return ans
}
// @lc code=end
