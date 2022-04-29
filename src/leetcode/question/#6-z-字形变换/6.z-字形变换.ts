/*
 * @lc app=leetcode.cn id=6 lang=typescript
 *
 * [6] Z 字形变换
 */

// @lc code=start
function convert(s: string, numRows: number): string {
  // z 字形,比如 s = 'leetcode' numsRows = 3
  // ret[0].push => l     c
  // ret[1].push => e  t  o  e
  // ret[2].push => e     d
  // 从头遍历字符串,到顶点转向,然后拼串
  if (numRows < 2) return s
  const res = new Array(numRows).fill('')
  let i = 0,
    flag = -1
  for (const v of s) {
    res[i] += v
    //           0 行首
    // numRows - 1 行尾
    // 拐弯
    if (i === 0 || i === numRows - 1) flag = -flag
    i += flag
  }
  return res.join('')
}
// @lc code=end
