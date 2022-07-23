/*
 * @lc app=leetcode.cn id=100178 lang=typescript
 *
 * [剑指offer] 剑指offer-115
 */

// @lc code=start
function sequenceReconstruction(
  nums: number[],
  sequences: number[][]
): boolean {
  const hash = (prev: number, next: number): number => {
    return (prev << 14) | next
  }
  const s = new Set<number>()
  for (const seq of sequences) {
    for (let i = 0; i < seq.length - 1; i++) {
      s.add(hash(seq[i], seq[i + 1]))
    }
  }
  for (let i = 0; i < nums.length - 1; i++) {
    if (!s.has(hash(nums[i], nums[i + 1]))) {
      return false
    }
  }
  return true
}
// @lc code=end
