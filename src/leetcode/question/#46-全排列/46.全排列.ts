/*
 * @lc app=leetcode.cn id=46 lang=typescript
 *
 * [46] 全排列
 */

// @lc code=start
function permute(nums: number[]): number[][] {
  // 采用递归回溯,将每一种情况进行枚举
  // [1]
  // [1, 2]
  // [1, 2, 3]
  // [1, 2]
  // [1]
  // [1, 3]
  // [1, 3, 2]
  // [1, 3]
  // [1]
  // []
  // [2]
  // [2, 1]
  // [2, 1, 3]
  // [2, 1]
  // [2]
  // [2, 3]
  // [2, 3, 1]
  // 利用递归系统栈帮助我们做这个事情
  function helperFn(list: number[][], temp: number[], nums: number[]) {
    if (temp.length === nums.length) {
      list.push([...temp])
      return
    }
    for (let i = 0; i < nums.length; i++) {
      if (temp.includes(nums[i])) {
        continue
      }
      temp.push(nums[i])
      helperFn(list, temp, nums)
      temp.pop()
    }
  }
  const list: number[][] = []
  helperFn(list, [], nums)
  return list
}
// @lc code=end
