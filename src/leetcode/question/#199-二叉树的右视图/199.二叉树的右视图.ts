/*
 * @lc app=leetcode.cn id=199 lang=typescript
 *
 * [199] 二叉树的右视图
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

function rightSideView(root: TreeNode | null): number[] {
  const ans: number[] = []
  if (!root) return ans
  // 队列遍历
  const queue = [root]
  while (queue.length) {
    // 当前层的数量
    let len = queue.length
    while (len--) {
      const node = queue.shift()
      if (!len) ans.push(node.val)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
  }
  return ans
}
// @lc code=end
