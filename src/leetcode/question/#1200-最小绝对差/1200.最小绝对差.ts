/*
 * @lc app=leetcode.cn id=1200 lang=typescript
 *
 * [1200] 最小绝对差
 */

// @lc code=start
function minimumAbsDifference(arr: number[]): number[][] {
  const n = arr.length
  arr.sort((a, b) => a - b)

  let best = Number.MAX_VALUE
  let ans = []
  for (let i = 0; i < n - 1; ++i) {
    let delta = arr[i + 1] - arr[i]
    if (delta < best) {
      best = delta
      ans = []
      const pair = []
      pair.push(arr[i])
      pair.push(arr[i + 1])
      ans.push(pair)
    } else if (delta === best) {
      const pair = []
      pair.push(arr[i])
      pair.push(arr[i + 1])
      ans.push(pair)
    }
  }

  return ans
}
// @lc code=end
