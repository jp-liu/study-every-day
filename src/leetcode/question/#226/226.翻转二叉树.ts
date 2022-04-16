/*
 * @lc app=leetcode.cn id=226 lang=typescript
 *
 * [226] 翻转二叉树
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

function invertTree(root: TreeNode | null): TreeNode | null {
  // 递归将每个分叉节点的左右节点翻转
  if (!root) return root

  // 如果用赋值运算,变更了left,right的left就有问题了,需要保存变量
  // const left = root.left
  // const right = root.right
  // root.left = invertTree(right)
  // root.right = invertTree(left)
  // root.right = root.left
  ;[root.left, root.right] = [invertTree(root.right), invertTree(root.left)]
  return root
}
// @lc code=end
