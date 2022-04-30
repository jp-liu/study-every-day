/*
 * @lc app=leetcode.cn id=908 lang=typescript
 *
 * [908] 最小差值 I
 */

// @lc code=start
function smallestRangeI(nums: number[], k: number): number {
  // 最初的想法就是,把最大值 -k, 最小值 +k,这样就能得到中间差值,就是最低分数了
  // 但是这样存在一个问题,当 最小值+k,大于最大值怎么办,不就超过了吗?
  // 所以当最大值大于最小值 2k 的时候,这样操作就是最小的, 否则,可以让他们相等得到最小值
  // 操作区间 [-k, +k] k=3的时候
  // 最小值为 3时,区间是  0,1,2,3,4,5,6
  // 最大值为 6时,区间是        3,4,5,6,7,8,9
  // 没有超过 2k, 他们会在操作区间中,有相同值
  let max = nums[0]
  let min = nums[0]
  for (let i = 0; i < nums.length; i++) {
    max = Math.max(nums[i], max)
    min = Math.min(nums[i], min)
  }
  return max - min > 2 * k ? max - k - (min + k) : 0
}
// @lc code=end
