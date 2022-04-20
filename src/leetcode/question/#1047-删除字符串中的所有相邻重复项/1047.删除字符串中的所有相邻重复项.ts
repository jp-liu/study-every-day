/*
 * @lc app=leetcode.cn id=1047 lang=typescript
 *
 * [1047] 删除字符串中的所有相邻重复项
 */

// @lc code=start
function removeDuplicates(s: string): string {
  // 开心消消乐
  const stack: string[] = []
  for (const v of s) {
    if (v === stack.at(-1)) {
      stack.pop()
      continue
    }
    stack.push(v)
  }
  return stack.join('')
}
// @lc code=end
