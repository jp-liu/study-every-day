/*
 * @lc app=leetcode.cn id=647 lang=typescript
 *
 * [647] 回文子串
 */

// @lc code=start
function countSubstrings(s: string): number {
  // 动态规划
  // 状态定义: dp[i][j] 表示字符串s[i,j] 是否是回文
  const len = s.length
  const dp = new Array(len).fill(false).map(() => new Array(len).fill(false))

  let result = 0
  for (let i = len; i >= 0; i--) {
    for (let j = i; j < len; j++) {
      if (s[i] === s[j]) {
        if (j - i <= 1) {
          dp[i][j] = true
          result++
        } else if (dp[i + 1][j - 1]) {
          result++
          dp[i][j] = true
        }
      }
    }
  }
  return result
}
// @lc code=end

console.log(countSubstrings('aaa'))

function countSubstrings1(s: string): number {
  let count = 0
  const memo: boolean[] = []

  dfs(0)

  return count

  function dfs(idx: number) {
    if (idx === s.length || memo[idx]) return

    for (let i = idx + 1; i <= s.length; i++) {
      const str = s.slice(idx, i)
      if (isH(str)) {
        memo[idx] = true
        count++
        dfs(i)
      }
    }
  }
}

function isH(str: string) {
  let l = 0
  let r = str.length - 1
  while (l < r) {
    if (str[l] !== str[r]) return false
    l++
    r--
  }
  return true
}

function countSubstrings2(s: string): number {
  // 中心扩散法,判断回文
  let count = 0
  for (let i = 0; i < s.length; i++) {
    for (let j = 0; j <= 1; j++) {
      // 奇数是一个字母中心,偶数是两个字母为中心,所以是 0 - 1 的区间内选择
      let l = i
      let r = i + j // 0的时候是奇数, 1 的时候是偶数
      while (l >= 0 && s[l--] === s[r++]) count++
    }
  }
  return count
}
