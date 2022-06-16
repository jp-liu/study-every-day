/*
 * @lc app=leetcode.cn id=34 lang=typescript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
function binarySearch(nums: number[], target: number, flag: boolean) {
  let n = nums.length,
    left = 0,
    right = n - 1

  while (left <= right) {
    const mid = (left + right) >> 1
    if (nums[mid] > target || (flag && nums[mid] >= target)) {
      n = mid
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return n
}
function searchRange(nums: number[], target: number): number[] {
  let ans = [-1, -1]
  // 左边界，第一个大于等于 target 的值
  const l = binarySearch(nums, target, true)
  // 一个都没有
  if (nums[l] !== target) return ans
  // 右边界
  const r = binarySearch(nums, target, false) - 1

  if (l <= r && r < nums.length && nums[l] === target && nums[r] === target) {
    ans = [l, r]
  }
  return ans
}
// @lc code=end
searchRange([1], 1)
export {}
