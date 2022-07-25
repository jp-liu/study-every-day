/*
 * @lc app=leetcode.cn id=919 lang=typescript
 *
 * [919] 完全二叉树插入器
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

class CBTInserter {
  private root: TreeNode | null
  private nodes: TreeNode[]
  constructor(root: TreeNode | null) {
    this.root = root
    this.nodes = []

    const queue = [root]
    while (queue.length) {
      const node = queue.shift()
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
      if (!(node.left && node.right)) {
        this.nodes.push(node)
      }
    }
  }

  insert(val: number): number {
    const child = new TreeNode(val)
    const ret = this.nodes[0]
    if (!ret.left) {
      ret.left = child
    } else {
      ret.right = child
      this.nodes.shift()
    }
    this.nodes.push(child)
    return ret.val
  }

  get_root(): TreeNode | null {
    return this.root
  }
}

/**
 * Your CBTInserter object will be instantiated and called as such:
 * var obj = new CBTInserter(root)
 * var param_1 = obj.insert(val)
 * var param_2 = obj.get_root()
 */
// @lc code=end
