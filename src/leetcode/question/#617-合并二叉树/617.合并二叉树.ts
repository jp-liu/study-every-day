/*
 * @lc app=leetcode.cn id=617 lang=typescript
 *
 * [617] 合并二叉树
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

function mergeTrees(
  root1: TreeNode | null,
  root2: TreeNode | null
): TreeNode | null {
  const dfs = (root1: TreeNode, root2: TreeNode) => {
    if (!root1 && !root2) return null
    if (!root1) return root2
    if (!root2) return root1
    root1.val += root2.val
    root1.left = dfs(root1.left, root2.left)
    root1.right = dfs(root1.right, root2.right)
    return root1
  }

  return dfs(root1, root2)
}
// @lc code=end
