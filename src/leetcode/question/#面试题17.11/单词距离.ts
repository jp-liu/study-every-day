/*
 * @lc app=leetcode.cn id=1000039 lang=typescript
 *
 * [面试题17.11] 单词距离
 */

// @lc code=start
function findClosest(words: string[], word1: string, word2: string): number {
  let w1Idx = Infinity
  let w2Idx = Infinity
  let ans = Infinity
  for (let i = 0; i < words.length; i++) {
    const w = words[i]
    if (w === word1) w1Idx = i
    if (w === word2) w2Idx = i
    if (w1Idx !== Infinity && w2Idx !== Infinity) {
      ans = Math.min(ans, Math.abs(w1Idx - w2Idx))
    }
  }
  return ans
}
// @lc code=end
findClosest(
  ['I', 'am', 'a', 'student', 'from', 'a', 'university', 'in', 'a', 'city'],
  'a',
  'student'
)
