/*
 * @lc app=leetcode.cn id=95 lang=typescript
 *
 * [95] 不同的二叉搜索树 II
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

function generateTrees(n: number): Array<TreeNode | null> {
  // 生成类的问题基本可以考虑使用回溯,进行每种方式的判断
  // 二叉搜索树,左节点 = (1 => i - 1) 右节点 = (n - i)
  if (n === 0) return [null]

  return backtrack(1, n)

  function backtrack(start: number, end: number) {
    const all: Array<TreeNode | null> = []
    if (start > end) {
      all.push(null)
      return all
    }
    for (let i = start; i <= end; i++) {
      const leftTree = backtrack(start, i - 1) // 左子树是 [1, i-1]
      const rightTree = backtrack(i + 1, end) // 右子树是 [i+1, end]

      for (const left of leftTree) {
        for (const right of rightTree) {
          const root = new TreeNode(i)
          root.left = left
          root.right = right
          all.push(root)
        }
      }
    }
    return all
  }
}
// @lc code=end
