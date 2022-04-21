/*
 * @lc app=leetcode.cn id=17 lang=typescript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
function letterCombinations(digits: string): string[] {
  const len = digits.length
  if (!len) return []
  // 数字键对应映射字母
  const map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  if (len === 1) return map[digits[0]].split('')

  const ans: string[] = []
  // 记录当前处理字符
  const path: string[] = []
  // 从第一个字母开始处理
  backtrack(0)
  return ans
  function backtrack(c: number) {
    // 如果已经处理到最后一个键
    if (path.length === len) {
      ans.push(path.join(''))
      return
    }
    // 获取对应映射字母
    const w = map[digits[c]]
    for (const k of w) {
      // 取出键对应的字母,开始处理
      path.push(k)
      // 当前字母,去组合其他键的字母
      backtrack(c + 1)
      // 处理完毕后放出来,继续之前的处理,回溯,就是回来继续处理未处理完毕的内容
      path.pop()
    }
  }
}
// @lc code=end
