/*
 * @lc app=leetcode.cn id=433 lang=typescript
 *
 * [433] 最小基因变化
 */

// @lc code=start
function minMutation(start: string, end: string, bank: string[]): number {
  const bankSet = new Set(bank)
  // 记录当前序列和经历了几次变化
  const queue: [string, number][] = [[start, 0]]
  while (queue.length) {
    const cur = queue.shift()
    // 遍历当前序列
    for (let i = 0; i < cur[0].length; i++) {
      for (const s of ['A', 'C', 'G', 'T']) {
        // 字符不同,才进行处理
        if (cur[0].charAt(i) !== s.charAt(0)) {
          // 变化当前字符,组成新的序列, 查看是否在库中有
          // 有就删掉,表示已经处理过这样的序列
          // 没有不处理
          const str = cur[0].slice(0, i) + s + cur[0].slice(i + 1)
          if (bankSet.has(str)) {
            // 与结果相等,则返回结果
            if (str === end) return cur[1] + 1
            bankSet.delete(str)
            queue.push([str, cur[1] + 1])
          }
        }
      }
    }
  }
  return -1
}
// @lc code=end
