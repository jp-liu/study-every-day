/*
 * @lc app=leetcode.cn id=1022 lang=typescript
 *
 * [1022] 从根到叶的二进制数之和
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

function sumRootToLeaf(root: TreeNode | null): number {
  const res: string[] = []
  const dfs = (root: TreeNode | null, bitString: string): null | undefined => {
    if (!root) {
      return null
    }
    const num = bitString + root.val
    const left = dfs(root.left, num)
    const right = dfs(root.right, num)
    if (left === null && right === null) {
      res.push(num)
    }
  }
  dfs(root, '')
  return res.map(item => parseInt(item, 2)).reduce((a, b) => a + b)
}
// @lc code=end
// ;[1, 0, 1, 0, 1, 0, 1]
const root = new TreeNode(
  1,
  new TreeNode(0, new TreeNode(0), new TreeNode(1)),
  new TreeNode(1, new TreeNode(0), new TreeNode(1))
)
sumRootToLeaf(root)
