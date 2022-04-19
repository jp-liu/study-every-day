/*
 * @lc app=leetcode.cn id=116 lang=typescript
 *
 * [116] 填充每个节点的下一个右侧节点指针
 */
import type { Node } from '../Node'
// @lc code=start
/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     left: Node | null
 *     right: Node | null
 *     next: Node | null
 *     constructor(val?: number, left?: Node, right?: Node, next?: Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function connect(root: Node | null): Node | null {
  if (!root) return root
  const queue = [root]
  while (queue.length) {
    let len = queue.length
    for (let i = 0; i < len; i++) {
      const node = queue.shift()
      if (i !== len - 1) node.next = queue[0]
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
  }
  return root
}
// @lc code=end
