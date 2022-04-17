/*
 * @lc app=leetcode.cn id=209 lang=typescript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
function minSubArrayLen(target: number, nums: number[]): number {
  // 双指针+滑动窗口,窗口最小的
  let len = nums.length
  let res = len + 1
  let slow = 0
  let fast = 0
  let sum = 0
  while (fast < len) {
    sum += nums[fast++]
    // 直到sum < target,才能开始下一个窗口,不然没意义
    while (sum >= target) {
      const subLen = fast - slow
      res = res < subLen ? res : subLen
      sum -= nums[slow++]
    }
  }
  return res > len ? 0 : res
}
minSubArrayLen(7, [2, 3, 1, 2, 4, 3])
// @lc code=end
