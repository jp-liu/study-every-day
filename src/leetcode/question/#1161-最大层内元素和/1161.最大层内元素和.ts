/*
 * @lc app=leetcode.cn id=1161 lang=typescript
 *
 * [1161] 最大层内元素和
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

function maxLevelSum(root: TreeNode | null): number {
  const sum: number[] = []
  const dfs = (node: TreeNode | null, level: number) => {
    if (level === sum.length) {
      sum.push(node.val)
    } else {
      sum.splice(level, 1, sum[level] + node.val)
    }
    if (node.left) {
      dfs(node.left, level + 1)
    }
    if (node.right) {
      dfs(node.right, level + 1)
    }
  }
  dfs(root, 0)
  let ans = 0
  for (let i = 0; i < sum.length; ++i) {
    if (sum[i] > sum[ans]) {
      ans = i
    }
  }
  return ans + 1 // 层号从 1 开始
}
// @lc code=end
