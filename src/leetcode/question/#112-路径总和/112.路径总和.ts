/*
 * @lc app=leetcode.cn id=112 lang=typescript
 *
 * [112] 路径总和
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

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) return false
  const traverse = (root: TreeNode, sum: number): boolean => {
    if (!root) return false
    if (!root.left && !root.right) {
      // 有一个叶子节点之和等于目标值即可
      return (sum += root.val) === targetSum
    }

    return (
      traverse(root.left, root.val + sum) ||
      traverse(root.right, root.val + sum)
    )
  }
  return traverse(root, 0)
}
// @lc code=end
