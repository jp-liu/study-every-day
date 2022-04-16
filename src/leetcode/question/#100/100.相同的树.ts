/*
 * @lc app=leetcode.cn id=100 lang=typescript
 *
 * [100] 相同的树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  // 有一个不存在则为当前节点不相同
  if ((!p && q) || (p && !q)) {
    return false
  }
  // 同时为null,当前节点相同
  else if (!p && !q) {
    return true
  }
  // 1.相同结构,值锁在位置也相同,也就是
  if (p.val === q.val) {
    // 相同的值,才进行向下比较,同步下钻的结构
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
  }
  return false
}
// @lc code=end
