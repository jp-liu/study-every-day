/*
 * @lc app=leetcode.cn id=396 lang=typescript
 *
 * [396] 旋转函数
 */

// @lc code=start
function maxRotateFunction(nums: number[]): number {
  // 每一次旋转都会让所有元素的系数加一,也就相当于加上所有元素之和
  // 只有最后一个元素因为系数变成0,需要被减去
  // f(0) 就是一号元素
  // 后面每一次旋转,都是将最后一个元素调整为第一个元素
  const n = nums.length
  let f = 0,
    sum = 0
  for (let i = 0; i < n; i++) {
    sum += nums[i]
    f += nums[i] * i
  }
  let ans = f
  // 每次旋转就是最后一个元素变为头结点,所以从最后开始
  // 0号元素已经处理过,所以 i>0,而不是i>=0
  for (let i = n - 1; i > 0; i--) {
    f += sum - n * nums[i]
    ans = Math.max(ans, f)
  }
  return ans
}
// @lc code=end
