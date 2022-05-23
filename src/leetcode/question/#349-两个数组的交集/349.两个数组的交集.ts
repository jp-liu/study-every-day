/*
 * @lc app=leetcode.cn id=349 lang=typescript
 *
 * [349] 两个数组的交集
 */

// @lc code=start
function intersection(nums1: number[], nums2: number[]): number[] {
  const ansSet = new Set()
  const nums1Set = new Set(nums1)
  for (const num of nums2) {
    if (nums1Set.has(num)) ansSet.add(num)
  }
  return [...ansSet] as number[]
}
// @lc code=end
