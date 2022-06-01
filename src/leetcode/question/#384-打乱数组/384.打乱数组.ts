/*
 * @lc app=leetcode.cn id=384 lang=typescript
 *
 * [384] 打乱数组
 */

// @lc code=start
class Solution {
  nums: number[]
  constructor(nums: number[]) {
    this.nums = nums
  }

  reset(): number[] {
    return this.nums
  }

  shuffle(): number[] {
    const arr = this.nums.slice()
    for (let i = arr.length - 1; i >= 0; i--) {
      const randomIdx = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[randomIdx]] = [arr[randomIdx], arr[i]]
    }
    return arr
  }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */
// @lc code=end
