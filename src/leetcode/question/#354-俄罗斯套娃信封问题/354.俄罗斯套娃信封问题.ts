/*
 * @lc app=leetcode.cn id=354 lang=typescript
 *
 * [354] 俄罗斯套娃信封问题
 */

// @lc code=start
function maxEnvelopes(envelopes: number[][]): number {
  // 最长递增子序列扩展到二维了
  // 套娃的前提，宽高都要大于小的信封，那么将宽度排序，大的能套小的宽
  // 那么高度呢？高度我们如果存在宽度相同，则将高度高的放前面，这样就可以嵌套之前矮的高
  envelopes.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0]
    else return b[1] - a[1]
  })

  const n = envelopes.length
  const f = [envelopes[0][1]]
  for (let i = 1; i < n; i++) {
    const num = envelopes[i][1]
    if (num > f[f.length - 1]) {
      f.push(num)
    } else {
      const index = binarySearch(f, num)
      f[index] = num
    }
  }
  return f.length
}
const binarySearch = (f: number[], target: number) => {
  let low = 0,
    high = f.length - 1
  while (low < high) {
    const mid = Math.floor((high - low) / 2) + low
    if (f[mid] < target) {
      low = mid + 1
    } else {
      high = mid
    }
  }
  return low
}
// @lc code=end

console.log(
  maxEnvelopes([
    [5, 4],
    [6, 4],
    [6, 7],
    [2, 3]
  ])
)
