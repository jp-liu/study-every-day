/*
 * @lc app=leetcode.cn id=40 lang=typescript
 *
 * [40] 组合总和 II
 */

// @lc code=start
function combinationSum2(candidates: number[], target: number): number[][] {
  // 排序利于剪枝
  candidates.sort((a, b) => a - b)
  const path: number[] = []
  const ans: number[][] = []
  const visited: boolean[] = []
  backtrack(0, 0)
  return ans

  function backtrack(idx: number, sum: number) {
    if (sum > target) return
    if (sum === target) return ans.push([...path])

    for (let i = idx; i < candidates.length; i++) {
      const num = candidates[i]
      if (num === candidates[i - 1] && !visited[i - 1]) continue
      if (num + sum > target) break // 排序了,大于,则后面都没可能了
      if (!visited[i]) {
        visited[i] = true
        path.push(num)
        backtrack(i + 1, num + sum)
        path.pop()
        visited[i] = false
      }
    }
  }
}
// @lc code=end
// [1, 2, 2, 2] 5
//                5
//    1       2       2      2    5
// 2 2 2 5  2 2 5   2 5    5
// 1 2      v[1] = true
// 1 2 2    满足返回了
// 1 2 2    上一个2用过,且满足条件,则去掉重复项 continue
// if (num === candidates[i - 1] && !visited[i - 1]) continue
