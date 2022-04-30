/*
 * @lc app=leetcode.cn id=7 lang=typescript
 *
 * [7] 整数反转
 */

// @lc code=start
function reverse(x: number): number {
  let res = 0
  while (x !== 0) {
    // 每次取出末尾数字
    const temp = x % 10
    // 判断是否越界,
    // 最大值: 2147483647, 当res > 214748364 || res ===214748364 && temp > 7的时候越界
    if (res > 214748364 || (res === 214748364 && temp > 7)) {
      return 0
    }
    // 最小值: -2147483648,同上
    if (res < -214748364 || (res === -214748364 && temp > 8)) {
      return 0
    }
    res = res * 10 + temp
    x = (x / 10) | 0
  }
  return res
}
// @lc code=end
console.log(reverse(1534236469))
