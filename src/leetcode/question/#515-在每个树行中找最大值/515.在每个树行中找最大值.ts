/*
 * @lc app=leetcode.cn id=515 lang=typescript
 *
 * [515] 在每个树行中找最大值
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

function largestValues(root: TreeNode | null): number[] {
  const ans: number[] = []
  if (!root) return ans
  const queue = [root]
  while (queue.length) {
    let len = queue.length
    let maxSum = -Infinity
    while (len--) {
      const node = queue.shift()
      maxSum = Math.max(maxSum, node.val)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    ans.push(maxSum)
  }
  return ans
}
// @lc code=end
