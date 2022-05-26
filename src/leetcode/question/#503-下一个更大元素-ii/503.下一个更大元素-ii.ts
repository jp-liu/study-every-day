/*
 * @lc app=leetcode.cn id=503 lang=typescript
 *
 * [503] 下一个更大元素 II
 */

// @lc code=start
function nextGreaterElements(nums: number[]): number[] {
  // 循环数组,就是右边多一个当前数组 [1,2,1] => [1,2,1]
  const n = nums.length
  const ans = new Array(n).fill(-1)
  const stack = []
  for (let i = 0; i < n * 2; i++) {
    // 取余,就是在一个数组进行循环,不必对数组进行扩容
    const num = nums[i % n]
    while (stack.length && num > nums[stack[stack.length - 1]]) {
      const idx = stack.pop()
      ans[idx] = num
    }
    stack.push(i % n)
  }
  return ans
}
// @lc code=end

nextGreaterElements([1, 2, 1])
