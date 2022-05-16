/*
 * @lc app=leetcode.cn id=377 lang=typescript
 *
 * [377] 组合总和 Ⅳ
 */

// @lc code=start
function combinationSum4(nums: number[], target: number): number {
  // 同一个元素可以被多次使用,可以忽略位置,那么这个就像全排列了
  // 1.递推算法
  // 递推状态: f[i] 得到 i 的方法总数
  // 递推公式: f[i] = f(i - v1) + f(i - v2) 组成 i 的方法,就是 i - 对应的num
  const f = new Array(target + 1).fill(0)
  f[0] = 1
  for (let i = 1; i <= target; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] > i) continue
      f[i] += f[i - nums[j]]
    }
  }
  return f[target]

  // 零钱兑换 2,不适用
  // 每次使用 i 去刷表,一个 i 只用了一次, 而本题是不限元素选择位置,也就是每次都有可能用到
  // const f = new Array(target + 1).fill(0)
  // f[0] = 1
  // for (let i = 0; i < nums.length; i++) {
  //   for (let j = nums[i]; j <= target; j++) {
  //     f[j] = f[j] + f[j - nums[i]]
  //   }
  // }
  // return f[target]
}
// @lc code=end
console.log(combinationSum4([1, 2, 3], 4))
