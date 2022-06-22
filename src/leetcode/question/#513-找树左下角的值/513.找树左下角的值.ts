/*
 * @lc app=leetcode.cn id=513 lang=typescript
 *
 * [513] 找树左下角的值
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

function findBottomLeftValue(root: TreeNode | null): number {
  const queue = [root]

  let ans = root.val
  while (queue.length) {
    let size = queue.length
    let isFirst = true
    while (size--) {
      const item = queue.shift()
      if (isFirst) ans = item.val
      isFirst = false
      if (item.left) queue.push(item.left)
      if (item.right) queue.push(item.right)
    }
  }
  return ans
}
// @lc code=end
