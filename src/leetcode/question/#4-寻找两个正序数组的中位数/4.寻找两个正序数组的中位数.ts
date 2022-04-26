/*
 * @lc app=leetcode.cn id=4 lang=typescript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // 1.暴力破解
  // 先合并数组,然后二分查找
  // const arr: number[] = [].concat(nums1, nums2)
  // const ans = quickSort(arr)
  // const len = ans.length
  // const mid = (len / 2) | 0
  // return len % 2 === 0 ? (ans[mid] + ans[mid - 1]) / 2 : ans[mid]

  // 2.模拟合并两个有序链表
  const m = nums1.length
  const n = nums2.length
  const mid = ((m + n) / 2) | 0
  let index1 = 0
  let index2 = 0
  let prev = 0
  let now = 0
  while (index1 < m || index2 < n) {
    // nums1 遍历完毕
    if (index1 === m) {
      now = nums2[index2]
      index2++
    }
    // nums2 遍历完毕
    else if (index2 === n) {
      now = nums1[index1]
      index1++
    }
    // 都没遍历完毕就选一个最小的
    else if (nums1[index1] <= nums2[index2]) {
      now = nums1[index1]
      index1++
    } else {
      now = nums2[index2]
      index2++
    }
    if (index1 + index2 - 1 == mid) {
      // 奇数
      if ((m + n) % 2 == 1) {
        return now
        // 偶数取平均值
      } else {
        return (prev + now) / 2
      }
    }
    prev = now
  }
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
