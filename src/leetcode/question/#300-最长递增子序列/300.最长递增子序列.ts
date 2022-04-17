/*
 * @lc app=leetcode.cn id=300 lang=typescript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
function lengthOfLIS(nums: number[]): number {
  // 贪心算法
  // 让子序列增长尽可能的慢,也就是数值尽可能小的增长
  // [1,3,5] 比 [1,4,5] 要好
  let n = nums.length
  if (!n) return 0
  let ans = [nums[0]]
  for (let i = 1; i < n; i++) {
    if (nums[i] > ans[ans.length - 1]) {
      ans.push(nums[i])
    } else {
      // 二分查找,将最先比 nums[i] 大的位置替换
      let left = 0
      let right = ans.length - 1
      while (left < right) {
        const mid = (left + right) >> 1
        // [1, 2, 5] 4 mid=1 2 < 4 ? left = mid+1
        if (ans[mid] < nums[i]) {
          left = mid + 1
        } else {
          right = mid
        }
      }
      ans[left] = nums[i]
    }
  }
  return ans.length

  // 动态规划
  // 边界条件
  // 循环
  //  递推公式
  // let n = nums.length
  // if (!n) return 0

  // const dp = Array(n).fill(1)
  // // 遍历每一个元素
  // for (let i = 0; i < n; i++) {
  //   // 遍历当前元素前面的元素
  //   for (let j = 0; j < i; j++) {
  //     if (nums[i] > nums[j]) {
  //       // [1, 0, 2] nums
  //       // [1, 1, 1] dp
  //       // 2 > 0, dp[2] = dp[1] + 1
  //       dp[i] = Math.max(dp[i], dp[j] + 1)
  //     }
  //   }
  // }
  // return Math.max(...dp)
}
// @lc code=end
