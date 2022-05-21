/*
 * @lc app=leetcode.cn id=961 lang=typescript
 *
 * [961] 在长度 2N 的数组中找出重复 N 次的元素
 */

// @lc code=start
function repeatedNTimes(nums: number[]): number {
  // const len = nums.length
  // const n = len >> 1
  // const map = new Map()
  // for (let i = 0; i < len; i++) {
  //     const num = nums[i]
  //     if(map.has(num))map.set(num, map.get(num) + 1)
  //     else map.set(num, 1)
  // }
  // for(const [num, size] of map.entries()) {
  //     if(size === n) return num
  // }
  const ans = []
  for (const num of nums) {
    if (!ans[num]) ans[num] = 1
    else return num
  }
}
// @lc code=end
