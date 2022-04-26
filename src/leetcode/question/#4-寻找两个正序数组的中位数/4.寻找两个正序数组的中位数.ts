/*
 * @lc app=leetcode.cn id=4 lang=typescript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // 1.暴力破解
  // 先合并数组,然后二分查找
  const arr: number[] = [].concat(nums1, nums2)
  const ans = quickSort(arr)
  const len = ans.length
  const mid = (len / 2) | 0
  return len % 2 === 0 ? (ans[mid] + ans[mid - 1]) / 2 : ans[mid]
}
// 快排
function quickSort(nums: number[]): number[] {
  if (nums.length <= 1) return nums
  const init = nums[0]
  const left = []
  const right = []
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i]
    if (num > init) {
      right.push(num)
    } else {
      left.push(num)
    }
  }
  return quickSort(left).concat(init, quickSort(right))
}
// @lc code=end
