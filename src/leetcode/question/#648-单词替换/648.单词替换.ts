/*
 * @lc app=leetcode.cn id=648 lang=typescript
 *
 * [648] 单词替换
 */

// @lc code=start
function replaceWords(dictionary: string[], sentence: string): string {
  const arr = sentence.split(' ')
  for (let i = 0; i < arr.length; i++) {
    const s = arr[i]
    let dir = s
    for (const str of dictionary) {
      if (s.startsWith(str)) {
        dir = str.length < dir.length ? str : dir
      }
    }
    arr[i] = dir
  }
  return arr.join(' ')
}
// @lc code=end
