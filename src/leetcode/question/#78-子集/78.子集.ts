/*
 * @lc app=leetcode.cn id=78 lang=typescript
 *
 * [78] 子集
 */

// @lc code=start
function subsets(nums: number[]): number[][] {
  // 回溯,就是 n 叉树
  //    根(自然模拟)
  //   1     2    3
  // 2  3   3
  // 排列就是
  // 1, 12, 123
  // 2, 23
  // 3
  const ans: number[][] = []
  const path: number[] = []
  // 从第0个元素开始
  backtrack(0)
  return ans
  function backtrack(i: number /* 当前第几个元素 */) {
    ans.push([...path])
    for (let j = i; j < nums.length; j++) {
      // 当前元素
      const num = nums[j]
      path.push(num)
      backtrack(j + 1)
      path.pop()
    }
  }
}
// @lc code=end
