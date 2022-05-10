/*
 * @lc app=leetcode.cn id=11 lang=typescript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
function maxArea(height: number[]): number {
  // 双指针, i 为头,j 为尾,name面积就是 短板高度 * 所占空间数
  // S(i, j) = Math.min(height[i], height[j]) * (j - i)
  let ans = 0
  let i = 0,
    j = height.length - 1
  while (i < j) {
    ans =
      height[i] < height[j]
        ? Math.max(ans, (j - i) * height[i++])
        : Math.max(ans, (j - i) * height[j--])
  }
  return ans
}
// @lc code=end
