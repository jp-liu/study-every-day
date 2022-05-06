/*
 * @lc app=leetcode.cn id=96 lang=typescript
 *
 * [96] 不同的二叉搜索树
 */

// @lc code=start
function numTrees(n: number): number {
  // 二叉搜索树,是中序遍历的递增,所以 n 个递增二叉搜索树为
  // f(n) = f(1)=>f(2)=>f(3)=>...fn(n)
  // f(i)表示以 i 为根节点时,满足的条件的总数,此时 `左子树: f(i-1)` `右子树:f(n-i)`
  // f(i) = 左子树符合条件数量 * 右子树符合条件数量
  const dp = Array(n + 1).fill(0) // f0,f1 分别有一种组合条件
  dp[0] = dp[1] = 1
  for (let i = 2; i <= n; i++) {
    // 以 i 为根节点
    for (let j = 0; j < i; j++) {
      // 左子树的数量为 0 -> i-1
      dp[i] += dp[j] * dp[i - 1 - j] // 右子树数量 i-1 去掉自身 - j,去掉左子树
    }
  }
  return dp[n]
}
// @lc code=end
console.log(numTrees(3))
