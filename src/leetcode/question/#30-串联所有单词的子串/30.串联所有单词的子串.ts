/*
 * @lc app=leetcode.cn id=30 lang=typescript
 *
 * [30] 串联所有单词的子串
 */

// @lc code=start
function findSubstring(s: string, words: string[]): number[] {
  // 滑动窗口方案
  const map = {}
  const windowLen = words.reduce((a, b) => {
    map[b] = map[b] ? map[b] + 1 : 1
    return a + b.length
  }, 0)
  const ans = []

  let i = 0
  while (i + windowLen - 1 < s.length) {
    let val = s.substring(i, windowLen + i)

    const temp = { ...map }
    for (let j = 0; j < words.length; j++) {
      for (const str of words) {
        if (val.startsWith(str) && temp[str] > 0) {
          temp[str]--
          val = val.slice(str.length)
        }
      }
    }
    if (!val.length) ans.push(i)
    i++
  }
  return ans
}
// @lc code=end

findSubstring('barfoothefoobarman', ['foo', 'bar'])

findSubstring('wordgoodgoodgoodbestword', ['word', 'good', 'best', 'word'])
