/*
 * @lc app=leetcode.cn id=1186 lang=typescript
 *
 * [1186] 删除一次得到子数组最大和
 */

// @lc code=start
function maximumSum(arr: number[]): number {
  // 状态定义: dp0 表示未删除任何数 dp1 表示已经删除过一个数
  let dp0 = arr[0],
    dp1 = 0,
    ans = dp0
  for (let i = 1; i < arr.length; i++) {
    const num = arr[i]
    // 大于零用来加处理
    if (num >= 0) {
      // 未删除: 如果之前相加为负数,这里又是正数,则从这里开始计算子数组,从 0 + num
      dp0 = Math.max(0, dp0) + num
      dp1 = dp1 + num // dp1 不是从0开始,因为要确保数组不为空
    }
    // 小于0可以用来删除
    else {
      dp1 = Math.max(dp0, dp1 + num) // 可以从头开始,也可以继续加
      dp0 = Math.max(0, dp0) + num // 同上
    }
    ans = Math.max(ans, dp0, dp1)
  }
  return ans
}
// @lc code=end
