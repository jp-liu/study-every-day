/*
 * @lc app=leetcode.cn id=77 lang=typescript
 *
 * [77] 组合
 */

// @lc code=start
function combine(n: number, k: number): number[][] {
  const ans: number[][] = []
  const path: number[] = []

  backtrack(n, k, 1)
  return ans
  function backtrack(n: number, k: number, i: number) {
    // 当前处理到第几个元素了
    const len = path.length
    if (len === k) {
      ans.push([...path])
      return
    }
    // 事实上，如果 n = 7, k = 4，从 5 开始搜索就已经没有意义了，
    // 这是因为：即使把 5 选上，后面的数只有 6 和 7，一共就 3 个候选数，凑不出 4 个数的组合。
    // k - len 代表还需要选择几个数
    // n - (k-len) + 1 表示搜索上界,后面不用在搜索了, +1,拿到最后一个值
    for (let j = i; j <= n - (k - len) + 1; j++) {
      path.push(j)
      backtrack(n, k, j + 1)
      path.pop()
    }
  }
}
// @lc code=end
