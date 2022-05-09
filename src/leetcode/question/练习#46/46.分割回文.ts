/**
 * 分割回文
 * 给出一个字符串S，问对字符串S最少切几刀，使得分成的每一部分都是一个回文串（注意：单一字符是回文串）
 */
function palindrome(s: string) {
  // 递推状态: dp[i] 表示以 i 结尾,前面的字符有效的回文串数量
  // 递推公式: dp[i] = Math.min(dp[i], dp[j] + 1) dp[j] 是以j结尾有效回文串数量 + 1 是加自己
  // dp[0] = 0, dp[i] = i, 最差就是每一个字符单独为回文

  // 1.利用中心扩散法,收集回文信息
  const g: number[][] = []
  for (let i = 0; i < s.length; i++) {
    exec(i, i) // odd
    exec(i, i + 1) // even
  }

  const dp = []
  dp[0] = 0
  for (let i = 1; i <= s.length; i++) {
    dp[i] = i
    for (const j of g[i]) {
      dp[i] = Math.min(dp[i], dp[j] + 1)
    }
  }

  return dp[s.length] - 1

  function exec(i: number, j: number) {
    while (i >= 0 && s[i] === s[j]) {
      if (!g[j + 1]) g[j + 1] = []
      // 从 i - j 位置是回文串,i越小,回文串越长,能组成的回文段就越少
      g[j + 1].push(i)
      i--
      j++
    }
  }
}
console.log(palindrome('sehuhzzexe'))
