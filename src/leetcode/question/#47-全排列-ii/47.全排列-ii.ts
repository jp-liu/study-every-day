/*
 * @lc app=leetcode.cn id=47 lang=typescript
 *
 * [47] 全排列 II
 */

// @lc code=start
function permuteUnique(nums: number[]): number[][] {
  const ans: number[][] = []
  const path: number[] = []
  nums.sort((a, b) => a - b)
  backtrack([])
  return ans
  function backtrack(
    used: boolean[] /* 标记当前位是否使用过,对于当前排列而言 */
  ) {
    if (path.length === nums.length) {
      ans.push([...path])
      return
    }
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i]
      // 如果二者相同,说明是重复的,只需要向后接着处理越过它
      // 因为前者为false,说明在上一步,它已经将当前元素的所有逻辑计算过了
      if (num === nums[i - 1] && !used[i - 1]) {
        continue
      }
      if (!used[i]) {
        used[i] = true
        path.push(num)
        backtrack(used)
        path.pop()
        used[i] = false
      }
    }
  }
}
// @lc code=end
