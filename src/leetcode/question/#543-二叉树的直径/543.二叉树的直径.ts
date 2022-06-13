/*
 * @lc app=leetcode.cn id=543 lang=typescript
 *
 * [543] 二叉树的直径
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

function diameterOfBinaryTree(root: TreeNode | null): number {
  // 和124.二叉树的最大路径和一样的问题,只是计算路径和是节点值相加
  // 本题是路径个数,也就是最大连接节点数 - 1
  if (!root) return 0
  let ans = 1 // 默认最大直径,仅仅一个根节点,没有左右子节点
  dfs(root)
  return ans - 1

  function dfs(root: TreeNode | null): number {
    if (!root) return 0
    const left = dfs(root.left)
    const right = dfs(root.right)
    ans = Math.max(ans, left + right + 1) // 左+右+根,总共节点个数,路径是个数-1
    return Math.max(left, right) + 1
  }
}
// @lc code=end
