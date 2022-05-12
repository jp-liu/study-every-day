/*
 * @lc app=leetcode.cn id=139 lang=typescript
 *
 * [139] 单词拆分
 */

// @lc code=start
function wordBreak(s: string, wordDict: string[]): boolean {
  // BFS
  const len = s.length
  const wordSet = new Set(wordDict)
  const queue = [0]
  const visited = []
  while (queue.length) {
    const start = queue.shift()
    if (visited[start]) continue
    visited[start] = true
    for (let i = start + 1; i <= len; i++) {
      const prefix = s.slice(start, i)
      if (wordSet.has(prefix)) {
        if (i < len) {
          queue.push(i)
        } else {
          return true
        }
      }
    }
  }
  return false
}
// @lc code=end
wordBreak('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', [
  'a',
  'aa',
  'aaa',
  'aaaa',
  'aaaaa'
])

function wordBreak3(s: string, wordDict: string[]): boolean {
  // 完全背包
  // 递推状态: dp[i] 表示以 i 结尾的前面字符串,是否拼凑得到
  // 递推公式: dp[i] = dp[i] 之前就可以拼到,可以视为一个单词吧
  //         dp[i] = dp[i - word.length] word是 i 结尾前面正好匹配的一个单词,这个单词匹配了, 就看之前是否可以匹配得到,匹配一个没用
  const len = s.length
  const dp = new Array(len + 1).fill(false)
  dp[0] = true
  for (let i = 1; i <= len; i++) {
    const suffix = s.slice(0, i)
    for (const word of wordDict) {
      if (suffix.endsWith(word)) {
        dp[i] = dp[i - word.length] || dp[i]
      }
    }
  }
  return dp[len]
}

function wordBreak2(s: string, wordDict: string[]): boolean {
  // 递推状态: dp[i] 表示以 i 结尾的前面字符串,是否拼凑得到
  // 递推公式: dp[i] 0-i 可以得到,  0-j可以拼的到, j-i 可以,则可以
  // leetcode
  // 0-j, j-i,  j===0 则为 0-i,三者均覆盖
  const len = s.length
  const wordSet = new Set(wordDict)
  const dp = new Array(len + 1).fill(false)
  dp[0] = true
  for (let i = 1; i <= len; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (dp[i]) break
      if (dp[j] === false) continue
      const str = s.slice(j, i)
      if (wordSet.has(str) && dp[j]) {
        dp[i] = true
        break
      }
    }
  }
  return dp[len]
}

function wordBreak1(s: string, wordDict: string[]): boolean {
  // 递归求解: 回溯
  const len = s.length
  const wordSet = new Set(wordDict)
  const memo: boolean[] = [] // 保存已经处理过的

  const backtrack = (index: number) => {
    if (index === len) return true // 指针越界,说明前面的匹配正确
    if (memo[index] !== undefined) return memo[index] // 之前处理过相同的字符串
    for (let i = index + 1; i <= len; i++) {
      const prefix = s.slice(index, i)
      if (wordSet.has(prefix) && backtrack(i)) {
        // 切出来的部分是一个单词,并且后面的字符串也满足切割
        memo[index] = true
        return true
      }
    }
    memo[index] = false
    return false // 怎么切,都不满足
  }

  return backtrack(0)
}
