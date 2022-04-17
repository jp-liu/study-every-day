/*
 * @lc app=leetcode.cn id=94 lang=typescript
 *
 * [94] 二叉树的中序遍历
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

function inorderTraversal(root: TreeNode | null): number[] {
  if (!root) {
    return []
  }
  const ans: number[] = []
  // 1.递归方式
  // const rec = (node: TreeNode) => {
  //   if (!node) return node
  //   rec(node.left)
  //   ans.push(node.val)
  //   rec(node.right)
  // }
  // rec(root)
  // return ans

  // 2.迭代方式
  const stack = [root]
  while (stack.length) {
    const node = stack[stack.length - 1]
    if (node != null) {
      stack.pop()
      if (node.right) stack.push(node.right) // 右
      stack.push(node) // 中
      stack.push(null) // 分界符
      if (node.left) stack.push(node.left) // 左
    } else {
      stack.pop()
      const node = stack.pop()
      ans.push(node.val)
    }
  }
  return ans
}
// @lc code=end
