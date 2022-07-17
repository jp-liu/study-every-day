/*
 * @lc app=leetcode.cn id=565 lang=typescript
 *
 * [565] 数组嵌套
 */

// @lc code=start
function arrayNesting(nums: number[]): number {
  let ans = 0,
    n = nums.length
  for (let i = 0; i < n; ++i) {
    let cnt = 0
    while (nums[i] < n) {
      const num = nums[i]
      // 原地操作，当前元素如果被访问过，那么说明他前面有元素到达过它，肯定会比从它做起点多元素，
      // 至少多前面一个访问节点
      nums[i] = n
      i = num
      ++cnt
    }
    ans = Math.max(ans, cnt)
  }
  return ans
}
// @lc code=end

arrayNesting([5, 4, 0, 3, 1, 6, 2])
