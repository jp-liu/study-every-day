/*
 * @lc app=leetcode.cn id=5 lang=typescript
 *
 * [5] 最长回文子串
 */

// @lc code=start
function longestPalindrome(s: string): string {
  // 动态规划
  // 动态规划在于寻找初始状态和递推公式,通过每步得到最优解,达到最终最优解
  const len = s.length
  if (!s || len < 2) return s

  const dp = new Array(len).fill(false).map(() => new Array(len).fill(false))
  let maxStart = 0 // 最长回文子串起点
  let maxEnd = 0 // 最长回文子串终点
  let maxLen = 0 // 最长回文子串长度
  for (let r = 1; r < len; r++) {
    for (let l = 0; l < r; l++) {
      // r: 右边
      // l: 左边
      // 每次当 r == l 的时候,必然是回文是自己
      // 1.r-l > 2 二者虽然相等,中间却不是单位数,或者是偶数二者相等,则不可能是回文
      //    tips: 下标之间相减,是左侧真实元素数量
      // 2.r-l > 2 则看起中间是否是回文,如果是,则看中间结果,>2的条件不成立
      if (s[r] === s[l] && (dp[l + 1][r - 1] || r - l <= 2)) {
        dp[l][r] = true
        // 最长的
        if (r - l + 1 > maxLen) {
          maxLen = r - l + 1
          maxStart = l
          maxEnd = r
        }
      }
    }
  }
  return s.slice(maxStart, maxEnd + 1)
}
// @lc code=end
// 中心扩散法
function longestPalindrome1(s: string): string {
  // 中心扩散法
  // 回文串, 已自己为中心,向外扩散
  // 奇数 s[i] 如果是回文  s[i - 1] == s[i + 1]
  // 偶数 s[i][j] s[i - 1] == s[j + 1]
  // 向外扩散,直到不相同
  const len = s.length
  if (len < 2) return s
  let maxLen = 1 // 最长的回文串长度,动态变化
  let start = 0
  let end = 0
  for (let i = 0; i < s.length; i++) {
    const odd = expandPalindrome(s, i, i) // 奇数中心
    const even = expandPalindrome(s, i, i + 1) // 偶数中心
    // 取最大回文
    let a = Math.max(odd, even)
    if (a > maxLen) {
      maxLen = a
      // 当前下标作为中心的
      // 开始位置就是从这里向前推进一半的回文长度
      // 可能是偶数的回文,所以要 - 1 / 2 向下取整,去掉一个自己的重复身位
      start = i - ((maxLen - 1) >> 1)
      end = i + (maxLen >> 1)
    }
  }
  return s.slice(start, end + 1)
}
function expandPalindrome(s: string, left: number, right: number) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    // 向两端扩散
    --left
    ++right
  }
  // 是扩散到两端都不相同才停止的,所以最大长度是 左-右-1
  return right - left - 1
}
