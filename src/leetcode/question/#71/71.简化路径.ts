/*
 * @lc app=leetcode.cn id=71 lang=typescript
 *
 * [71] 简化路径
 */

// @lc code=start
function simplifyPath(path: string): string {
  // 文件层级栈
  const stack = []
  const paths = path.split('/')
  for (let i = 0; i < paths.length; i++) {
    const p = paths[i]
    // 上一级
    if (p === '..') {
      stack.pop()
    }
    // 文件夹名
    else if (p && p !== '.') {
      stack.push(p)
    }
  }
  return '/' + stack.join('/')
}
// @lc code=end
