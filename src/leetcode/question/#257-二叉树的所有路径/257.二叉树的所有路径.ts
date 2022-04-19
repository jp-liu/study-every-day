/*
 * @lc app=leetcode.cn id=257 lang=typescript
 *
 * [257] 二叉树的所有路径
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

function binaryTreePaths(root: TreeNode | null): string[] {
  const ans: string[] = []
  if (!root) ans

  const traverse = (root: TreeNode, path: string) => {
    if (!root) return
    // 当没有左右节点的时候,就是叶子节点,说明到头了
    if (!root.left && !root.right) {
      ans.push(path + root.val)
      return
    }
    // 递归获取左右子节点的路径
    traverse(root.left, path + root.val + '->')
    traverse(root.right, path + root.val + '->')
  }
  traverse(root, '')
  return ans
}
// @lc code=end
