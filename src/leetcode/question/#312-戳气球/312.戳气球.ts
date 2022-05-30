/*
 * @lc app=leetcode.cn id=312 lang=typescript
 *
 * [312] 戳气球
 */

// @lc code=start
function maxCoins(nums: number[]): number {
  // 1.戳气球的计算是三个一组
  // 2.下标 -1,nums.length, 需要补 1
  // 要计算戳破气球能得到最多的钱, 三个一组,我们就要计算每一组然后调最大的
  // 但是如果是戳气球,他们的顺序会变,上一步计算的值,无法应用到下一步, dp 也就没意义了
  // 所以转换一个思路, 求区间内最多硬币,区间是从头到尾就可以了,区间可以由 3 个一组,向外扩大
  // 状态定义: dp[i][j] 表示区间 (i, j) 内获取硬币最多的硬币
  nums.unshift(1)
  nums.push(1)
  const len = nums.length
  const dp = new Array(len + 2).fill(0).map(() => new Array(len + 2).fill(0))

  // 区间,最小区间是三个一组,扩大到最大区间
  for (let i = 3; i <= len; i++) {
    // 区间左端点,最大到 len-1, 区间元素不能少于 i
    for (let j = 0; j <= len - i; j++) {
      // 区间内元素
      let res = 0
      // 开区间,两个端点都取不到
      // 假设 k 就是最后一个破的气球
      // 假设 k 就是最后一个破的气球
      // 假设 k 就是最后一个破的气球
      for (let k = j + 1; k < j + i - 1; k++) {
        let left = dp[j][k] // 当前点左侧已经取得的最多的钱
        let right = dp[k][j + i - 1] // 当前点右侧已经取得的最多的钱
        res = Math.max(res, left + nums[j] * nums[k] * nums[j + i - 1] + right)
      }
      dp[j][j + i - 1] = res
    }
  }
  return dp[0][len - 1]
}
// @lc code=end
