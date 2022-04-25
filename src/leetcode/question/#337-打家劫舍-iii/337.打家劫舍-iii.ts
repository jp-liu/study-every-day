/*
 * @lc app=leetcode.cn id=337 lang=typescript
 *
 * [337] 打家劫舍 III
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

function rob(root: TreeNode | null): number {
  // 二叉树,三个节点只能偷一个
  const ret = dfs(root)
  return Math.max(...ret)

  function dfs(root: TreeNode): number[] {
    if (!root) return [0, 0]
    const left = dfs(root.left)
    const right = dfs(root.right)
    // 偷当前节点,左右节点就不偷了
    const doSelf = root.val + left[0] + right[0]
    // 不偷当前节点,就左右都可以偷
    const noDoSelf = Math.max(...left) + Math.max(...right)
    // 返回不偷自己的情况,和偷自己的情况
    return [noDoSelf, doSelf]
  }
}
export {}
// @lc code=end
