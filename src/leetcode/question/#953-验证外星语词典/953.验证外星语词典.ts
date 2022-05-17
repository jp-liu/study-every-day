/*
 * @lc app=leetcode.cn id=953 lang=typescript
 *
 * [953] 验证外星语词典
 */

// @lc code=start
function isAlienSorted(words: string[], order: string): boolean {
  const wLen = words.length
  const oLen = order.length
  const orderMap = new Map<string, number>()
  for (let i = 0; i < oLen; i++) orderMap.set(order[i], i)

  // 找出第一处不同,比较顺序
  for (let i = 0; i < wLen - 1; i++) {
    const w1 = words[i]
    const w2 = words[i + 1]
    for (let j = 0; j < w1.length; j++) {
      if (j === w2.length) return false

      if (w1[j] !== w2[j]) {
        const a = orderMap.get(w1[j])
        const b = orderMap.get(w2[j])
        if (a > b) {
          return false
        } else {
          break
        }
      }
    }
  }
  return true
}
// @lc code=end
