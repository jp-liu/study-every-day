/*
 * @lc app=leetcode.cn id=213 lang=typescript
 *
 * [213] 打家劫舍 II
 */

// @lc code=start
function rob(nums: number[]): number {
  const n = nums.length
  if (n === 1) return nums[0]
  const dp1 = robRange(nums, 0, n - 2)
  const dp2 = robRange(nums, 1, n - 1)
  return Math.max(dp1, dp2)
}

function robRange(nums: number[], start: number, end: number) {
  if (start === end) return nums[start]
  const dp = new Array(end + 1).fill(0)
  dp[start] = nums[start]
  dp[start + 1] = Math.max(nums[start], nums[start + 1])
  for (let i = start + 2; i <= end; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
  }
  return dp[end]
}

function robRange1(nums: number[]) {
  // prev 是上上次偷的钱 dp[i - 2]
  // cur  是上一次偷的钱 dp[i - 1]
  // 在循环中将 cur 更新为当前的钱
  let prev = 0,
    cur = 0,
    temp
  for (const val of nums) {
    temp = cur
    // 当前房间不偷, cur
    // 当前房间偷,就是偷当前和中间相隔的一家  val + prev
    cur = Math.max(cur, prev + val)
    prev = temp
  }
  return cur
}
export {}
// @lc code=end
