/*
 * @lc app=leetcode.cn id=111 lang=typescript
 *
 * [111] 二叉树的最小深度
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

function minDepth(root: TreeNode | null): number {
  // 递归法
  // if (!root) return 0
  // if (!root.left && !root.right) return 1
  // let dep = 0
  // if (root.left && !root.right) return 1 + minDepth(root.left)
  // if (!root.left && root.right) return 1 + minDepth(root.right)
  // if (root.left && root.right) return Math.min(minDepth(root.left), minDepth(root.right)) + 1

  // 迭代法
  if (!root) return 0
  let dep = 0
  const queue = [root]
  while (true) {
    let size = queue.length
    dep++
    while (size--) {
      const node = queue.shift()
      // 一层一层遍历,第一个叶子节点肯定是深度最小的
      if (!node.left && !node.right) {
        return dep
      }
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
  }
  return dep
}
// @lc code=end
