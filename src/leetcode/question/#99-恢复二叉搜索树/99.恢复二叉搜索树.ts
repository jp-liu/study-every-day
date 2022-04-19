/*
 * @lc app=leetcode.cn id=99 lang=typescript
 *
 * [99] 恢复二叉搜索树
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
function recoverTree(root: TreeNode | null): void {
  // 题目限制只有两个节点位置错误,不用涉及到逐级向上更换位置
  // 遍历树,获得数组后,查看是哪个地方出错,交换 `val`
  const list: TreeNode[] = []
  const traverse = (root: TreeNode) => {
    if (root === null) return
    traverse(root.left)
    list.push(root)
    traverse(root.right)
  }
  traverse(root)

  let first: TreeNode
  let second: TreeNode
  for (let i = 0; i < list.length - 1; i++) {
    if (list[i].val > list[i + 1].val) {
      if (!first) {
        first = list[i]
        second = list[i + 1]
      }
      second = list[i + 1]
    }
  }
  // let temp = first
  // first.val = second.val
  // second.val = temp.val
  ;[first.val, second.val] = [second.val, first.val]
}
// @lc code=end
