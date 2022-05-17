/*
 * @lc app=leetcode.cn id=338 lang=typescript
 *
 * [338] 比特位计数
 */

// @lc code=start
function countBits(n: number): number[] {
  // 递推状态定义: dp[i] 是 i 二进制中 1 的个数
  // 奇数比前一个偶数多一个 1, 是最低位的 1
  // 0  0000     2  0010
  // 1  0001     3  0011
  // 偶数和右移一位的数的 1 一致,因为最低位是 0
  // 2  0010    6  1000
  // 4  0100    8  1 0000
  const dp = new Array(n + 1)
  dp[0] = 0
  for (let i = 1; i <= n; i++) {
    // 奇数 奇数比前一个偶数最低位多一个一  2 => 0010  3 => 0011
    if (i & 1) {
      dp[i] = dp[i - 1] + 1
    }
    // 偶数 偶数的最低位是0,所以右移一位获取到1的数量一样  2 的二进制 0010 右移1位 0001
    else {
      dp[i] = dp[i >> 1]
    }
  }
  return dp
}
// @lc code=end
