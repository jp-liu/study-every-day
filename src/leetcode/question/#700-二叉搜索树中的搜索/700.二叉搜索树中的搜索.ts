/*
 * @lc app=leetcode.cn id=700 lang=typescript
 *
 * [700] 二叉搜索树中的搜索
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

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  if (!root) return null
  // 左小右大
  if (root.val > val) {
    return searchBST(root.left, val)
  } else if (root.val < val) {
    return searchBST(root.right, val)
  } else {
    return root
  }
}
// @lc code=end
