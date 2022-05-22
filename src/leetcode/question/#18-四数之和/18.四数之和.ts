/*
 * @lc app=leetcode.cn id=18 lang=typescript
 *
 * [18] 四数之和
 */

// @lc code=start
function fourSum(nums: number[], target: number): number[][] {
  // 四数之和: 可以使用排序+双指针,和三数之和差不多
  // 演变 n 数之和
  const len = nums.length
  const ans: number[][] = []
  const path: number[] = []
  nums.sort((a, b) => a - b)

  const dfs = (index: number, count: number, target: number) => {
    if (count === 0 && target === 0) return ans.push([...path])
    if (len - index < count) return // 不够数目
    if (nums[len - 1] * count < target) return // 所有值加起来没 target 大
    if (nums[index] * count > target) return // 最小值比 target 大
    for (let i = index; i < nums.length; i++) {
      if (i > index && nums[i] === nums[i - 1]) continue
      path.push(nums[i])
      dfs(i + 1, count - 1, target - nums[i])
      path.pop()
    }
  }
  dfs(0, 4, target)

  return ans
}
// @lc code=end

console.log(fourSum([1, 0, -1, 0, -2, 2], 0))
