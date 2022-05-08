/*
 * @lc app=leetcode.cn id=442 lang=typescript
 *
 * [442] 数组中重复的数据
 */

// @lc code=start
function findDuplicates(nums: number[]): number[] {
  const arr = []
  for (let i = 0; i < nums.length; i++) {
    // 扫描一遍, 访问过的设置为负数,第二次访问是负数,也就是标识了所以直接加入
    // [1-n] 也就是可以将数字识别为下标, [0, n-1]
    // 将 num 作为下标, 修改对应下标的数字, 当第二次拿到这个下标的时候,如果是负数,说明之前操作过
    const num = Math.abs(nums[i])
    if (nums[num - 1] > 0) {
      nums[num - 1] *= -1
    } else {
      arr.push(num)
    }
  }
  return arr
}
// @lc code=end
