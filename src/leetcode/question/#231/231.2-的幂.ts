/*
 * @lc app=leetcode.cn id=231 lang=typescript
 *
 * [231] 2 的幂
 */

// @lc code=start
function isPowerOfTwo(n: number): boolean {
  // 解法一: 递归,每次除以二,最后结果不是1,则为false
  // if (n === 1) {
  //   return true;
  // }
  // // n%2 = 1,奇数,
  // if (n % 2 !== 0 || n === 0 || n < 0) {
  //   return false;
  // }
  // return isPowerOfTwo(n / 2);

  // 解法二: 按照二进制位来算, 一个数是二的整数次幂,那么必然是是存在当前`位`为1,其他均为0
  // 1: 0001
  // 2: 0010
  // 4: 0100
  // 8: 1000

  // 4: 0100  n   是 2 的幂
  // 3: 0011  n-1 不是2的幂
  return n > 0 && (n & (n - 1)) === 0
}
// @lc code=end
