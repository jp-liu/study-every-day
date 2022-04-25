/*
 * @lc app=leetcode.cn id=213 lang=typescript
 *
 * [213] 打家劫舍 II
 */

// @lc code=start
function rob(nums: number[]): number {
  const n = nums.length
  if (n === 0) return 0
  if (n === 1) return nums[0]
  if (n === 2) return Math.max(nums[0], nums[1])
  // 头尾相连,那么头和尾只能偷一个了
  // 那就去掉头偷一次
  // 去掉尾偷一次
  const head = robRange(nums, 0, nums.length - 2)
  const tail = robRange(nums, 1, nums.length - 1)

  return Math.max(head, tail)

  function robRange(nums: number[], start: number, end: number) {
    // if (start === end) {
    //   return nums[start]
    // }
    // // 偷钱和第一个一样
    // // 记录上一次偷的钱,当前最多的钱
    // const dp = new Array(nums.length)
    // dp[start] = nums[start]
    // dp[start + 1] = Math.max(nums[start], nums[start + 1])
    // // 由于start和end是下标,所以 <= end 要等于
    // for (let i = start + 2; i <= end; i++) {
    //   dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
    // }
    // return dp[end]

    let prev = 0,
      cur = 0,
      temp
    for (let i = start; i <= end; i++) {
      temp = cur
      cur = Math.max(cur, prev + nums[i])
      prev = temp
    }
    return cur
  }
}
export {}
// @lc code=end
