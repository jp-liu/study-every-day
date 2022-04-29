/*
 * @lc app=leetcode.cn id=53 lang=typescript
 *
 * [53] 最大子数组和
 */

// @lc code=start
function maxSubArray(nums: number[]): number {
  // 贪心算法
  // let ret = nums[0]
  // let count = 0
  // for (let i = 0, j = 0; i < nums.length; i++) {
  //   // 每次都加上当前元素,然后看大小
  //   count += nums[i]
  //   if (count > ret) {
  //     ret = count
  //   }
  //   if (count < 0) {
  //     count = 0
  //   }
  // }
  // return ret

  // 2.动态规划
  // dp[i] 代表什么
  // dp[i] 代表当前位置最大子数组和
  // const dp = []
  // dp[0] = nums[0]
  // let ret = nums[0]
  // for (let i = 1; i < nums.length; i++) {
  //   // 如果前面的子数组和加起来都没当前元素大,还玩什么呢
  //   dp[i] = Math.max(nums[i], dp[i - 1] + nums[i])
  //   // 一次寻找每个位置,最大值记录,后面如果变小了,则不会记录
  //   ret = Math.max(ret, dp[i])
  // }
  // return ret
  // 3.动态规划,降维
  let dp = nums[0]
  let ret = nums[0]
  for (let i = 1; i < nums.length; i++) {
    dp = Math.max(nums[i], nums[i] + dp)
    ret = Math.max(ret, dp)
  }
  return ret
}
// @lc code=end
