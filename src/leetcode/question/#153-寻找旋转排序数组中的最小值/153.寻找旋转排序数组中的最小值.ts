/*
 * @lc app=leetcode.cn id=153 lang=typescript
 *
 * [153] 寻找旋转排序数组中的最小值
 */

// @lc code=start
function findMin(nums: number[]): number {
  // 两个升序数组,查找中间最小值,也就是第二段升序的起点
  // 二分,缩小区间
  let left = 0
  let right = nums.length - 1
  while (left < right) {
    // right - left 避免 right + left 越界 >> 1,除2,并取正
    const mid = left + ((right - left) >> 1)
    const num = nums[mid]
    // num 大,说明小值在右侧
    if (num > nums[right]) {
      left = mid + 1
    }
    // num 小,说明右侧都是大数值,需要向左找更小的
    else if (num < nums[right]) {
      right = mid
    }
  }
  return nums[left]
}
// @lc code=end
