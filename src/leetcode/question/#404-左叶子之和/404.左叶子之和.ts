/*
 * @lc app=leetcode.cn id=404 lang=typescript
 *
 * [404] 左叶子之和
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

function sumOfLeftLeaves(root: TreeNode | null): number {
  let sum = 0
  if (!root) return sum
  const traverse = (root: TreeNode) => {
    if (!root) return
    const left = root.left
    if (left && !left.left && !left.right) {
      sum += left.val
    }
    traverse(root.left)
    traverse(root.right)
  }
  traverse(root)
  return sum
}
// @lc code=end
