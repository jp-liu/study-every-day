/*
 * @lc app=leetcode.cn id=216 lang=typescript
 *
 * [216] 组合总和 III
 */

// @lc code=start
function combinationSum3(k: number, n: number): number[][] {
  // 排序利于剪枝
  const path: number[] = []
  const ans: number[][] = []
  backtrack(1)
  return ans

  function backtrack(idx: number, sum = 0) {
    if (sum > n || path.length > k) return
    if (sum === n && path.length === k) return ans.push([...path])

    for (let i = idx; i <= 9 - (k - path.length) + 1; i++) {
      if (i + sum > n) break // 1-9顺序排列,大于则后面更大
      path.push(i)
      backtrack(i + 1, i + sum)
      path.pop()
    }
  }
}
// @lc code=end
console.log(combinationSum3(3, 9))
// 3, 7
// 7
//   1        2       3   4 5 6 7 8 9
// 2 3 4... 3 4 5...
