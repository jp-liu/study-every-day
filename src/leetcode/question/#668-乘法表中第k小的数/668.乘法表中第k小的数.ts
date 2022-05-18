/*
 * @lc app=leetcode.cn id=668 lang=typescript
 *
 * [668] 乘法表中第k小的数
 */

// @lc code=start
function findKthNumber(m: number, n: number, k: number): number {
  let left = 1 // 从1开始
  let right = m * n // 总共有多少个数
  while (left < right) {
    // 二分查找
    let mid = (left + right) >> 1
    // 如果乘法表中小于等于mid的的数大于等于k,那肯定不满足第 k 小,因为已经超过范围了
    if (count(m, n, mid) >= k) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return left
}

// 统计乘法表中有多少个小于k的数
function count(m: number, n: number, k: number) {
  let res = 0
  // 统计每行有多少个小于k的数
  for (let i = 1; i <= m; i++) {
    res += Math.min((k / i) | 0, n)
  }
  return res
}
// @lc code=end
