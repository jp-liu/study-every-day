/*
 * @lc app=leetcode.cn id=39 lang=typescript
 *
 * [39] 组合总和
 */

// @lc code=start
function combinationSum(candidates: number[], target: number): number[][] {
  const ans: number[][] = []
  const path: number[] = []
  candidates.some((a, b) => a - b)
  backtrack(0, 0)
  return ans

  function backtrack(
    i: number /* 当前第几个元素 */,
    sum: number /* 当前之和 */
  ) {
    if (sum > target) return
    if (sum === target) {
      ans.push([...path])
      return
    }

    // 从 i 开始,i之前的全排列已经计算过了
    // 由于 j 从 i 开始,所以会重复先处理自己,直到不满足弹出,然后处理别的元素
    // [2,3,6,7] 7
    // => 2 2 2 2 = 8 > 7 由于排序,所以 后续不用进行,直接continue
    // => 2 2 3   = 7 = 7 加入并推出
    // => 2 2 6   = 10> 7 直接 continue
    // => 2 3 3   = 8 > 7 continue
    for (let j = i; j < candidates.length; j++) {
      const num = candidates[j]
      if (num + sum > target) {
        continue
      }
      path.push(num)
      backtrack(j, sum + num)
      path.pop()
    }
  }
}
// @lc code=end
