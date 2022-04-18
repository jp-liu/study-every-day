/*
 * @lc app=leetcode.cn id=114 lang=typescript
 *
 * [114] 二叉树展开为链表
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

/**
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {
  // 前序遍历结果,进行遍历更换为链表
  const list: TreeNode[] = []
  const traverse = (root: TreeNode) => {
    if (!root) return root
    list.push(root)
    traverse(root.left)
    traverse(root.right)
  }
  traverse(root)
  for (let i = 1; i < list.length; i++) {
    const prev = list[i - 1]
    prev.left = null
    prev.right = list[i]
  }
}
// @lc code=end
