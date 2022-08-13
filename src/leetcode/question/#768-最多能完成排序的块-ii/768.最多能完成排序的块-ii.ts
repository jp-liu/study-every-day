/*
 * @lc app=leetcode.cn id=768 lang=typescript
 *
 * [768] 最多能完成排序的块 II
 */

// @lc code=start
function maxChunksToSorted(arr: number[]): number {
  const n: number = arr.length
  let ans: number = 0
  const max: Array<number> = new Array<number>(n),
    min: Array<number> = new Array<number>(n)
  max[0] = arr[0]
  min[n - 1] = arr[n - 1]
  for (let i = 1; i < n; i++) {
    max[i] = Math.max(max[i - 1], arr[i])
    min[n - 1 - i] = Math.min(min[n - i], arr[n - 1 - i])
  }
  for (let i = 1; i < n; i++) {
    if (max[i - 1] <= min[i]) {
      ans++
    }
  }
  // 段的数量为割点数+1
  return ++ans
}
// @lc code=end
