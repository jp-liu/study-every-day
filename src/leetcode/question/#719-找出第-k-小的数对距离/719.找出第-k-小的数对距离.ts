/*
 * @lc app=leetcode.cn id=719 lang=typescript
 *
 * [719] 找出第 K 小的数对距离
 */

// @lc code=start
function smallestDistancePair(nums: number[], k: number): number {
  // 1.数对又数组两个不同下标组成
  // 但是无所谓顺序，因为都会遍历到，那么递增可以更好的二分
  nums.sort((a, b) => a - b)

  // 2.数对距离的范围 [0, 最大值-最小值]
  let n = nums.length,
    left = 0,
    right = nums[n - 1] - nums[0]

  // 3.二分查找，第K个数对，就是在数对范围内，看看每次能组成当前数对的个数
  // 超过 k 则多了，right = mid - 1， 少于 k 则少了，left = mid + 1
  let ans
  while (left <= right) {
    const mid = (left + right) >> 1
    let cnt = 0
    for (let i = 0, j = 0; j < n; j++) {
      while (nums[j] - nums[i] > mid) {
        i++
      }
      cnt += j - i // 能够凑成几个数对，就是 j - 1，要这个范围内的，所以 +=
    }

    if (cnt >= k) {
      ans = mid
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return ans
}
// @lc code=end

smallestDistancePair([1, 3, 1], 1)
