/*
 * @lc app=leetcode.cn id=145 lang=typescript
 *
 * [145] 二叉树的后序遍历
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

function postorderTraversal(root: TreeNode | null): number[] {
  if (!root) {
    return []
  }
  const ans: number[] = []
  // 1.递归方式
  // const rec = (node: TreeNode) => {
  //   if (!node) return node
  //   rec(node.left)
  //   rec(node.right)
  //   ans.push(node.val)
  // }
  // rec(root)
  // return ans

  // 2.迭代方式
  const stack = [root]
  while (stack.length) {
    const node = stack[stack.length - 1]
    if (node != null) {
      stack.pop()
      stack.push(node) // 中
      stack.push(null) // 分界符
      if (node.right) stack.push(node.right) // 右
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
