/*
 * @lc app=leetcode.cn id=532 lang=typescript
 *
 * [532] 数组中的 k-diff 数对
 */

// @lc code=start
function findPairs(nums: number[], k: number): number {
  nums.sort((a, b) => a - b)

  const n = nums.length

  // 排序+二分查找
  let ans = 0
  for (let i = 0; i < n; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue

    const target = nums[i] + k
    let left = i + 1,
      right = n,
      t = -1
    while (left <= right) {
      const mid = (left + right) >> 1
      if (nums[mid] >= target) {
        t = mid
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    if (t !== -1 && nums[t] === target) ans++
  }
  return ans
}
// @lc code=end

// 二分+双指针
function findPairs1(nums: number[], k: number): number {
  nums.sort((a, b) => a - b)

  const n = nums.length

  // 排序+双指针
  let ans = 0
  for (let i = 0, j = 0; i < n; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue
    while (j <= i) j++
    while (j < n && nums[j] < nums[i] + k) j++

    if (j < n && nums[j] === nums[i] + k) {
      ans++
    }
  }

  return ans
}
