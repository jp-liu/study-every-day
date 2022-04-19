/*
 * @lc app=leetcode.cn id=98 lang=typescript
 *
 * [98] 验证二叉搜索树
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

function isValidBST(root: TreeNode | null): boolean {
  // 二叉搜索树.左小右大
  // 中序遍历下,是递增关系
  if (!root) return false
  let prev = -Infinity
  const traverse = (root: TreeNode): boolean => {
    if (!root) return true
    if (!traverse(root.left)) return false
    // 如果当前节点比前一个节点小,则不符合左小右大的关系,为 false
    if (root.val <= prev) return false
    // 中序遍历,每次保留前一个节点
    prev = root.val
    if (!traverse(root.right)) return false
    return true
  }
  return traverse(root)
}
// @lc code=end
