/*
 * @lc app=leetcode.cn id=230 lang=typescript
 *
 * [230] 二叉搜索树中第K小的元素
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

function kthSmallest(root: TreeNode | null, k: number): number {
  // 二叉搜索树,中序遍历递增关系
  // 利用栈模拟中序递归遍历
  const stack = []
  while (root || stack.length) {
    // 进入左子树末尾
    while (root) {
      stack.push(root)
      root = root.left
    }
    // 去除末尾节点,就是当前中序遍历的节点
    root = stack.pop()
    // 每遍历一个节点, k - 1
    if (--k === 0) return root.val
    root = root.right
  }
  return -1
}
// @lc code=end
