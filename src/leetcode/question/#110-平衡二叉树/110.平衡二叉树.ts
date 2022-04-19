/*
 * @lc app=leetcode.cn id=110 lang=typescript
 *
 * [110] 平衡二叉树
 */

import { TreeNode } from '../TreeNode'

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

function isBalanced(root: TreeNode | null): boolean {
  if (!root) return true
  const traverse = (node: TreeNode) => {
    // 叶子节点深度为0
    if (!node) return 0
    // 左子树深度是否>=2,如果是则为-1,不平衡,不用看右边了
    const left: number = traverse(node.left)
    if (left === -1) return -1
    // 右子树深度是否>=2,如果是则为-1,不平衡
    const right: number = traverse(node.right)
    if (right === -1) return -1
    return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1
  }
  return traverse(root) !== -1
}
// @lc code=end
