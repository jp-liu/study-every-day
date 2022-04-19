/*
 * @lc app=leetcode.cn id=117 lang=typescript
 *
 * [117] 填充每个节点的下一个右侧节点指针 II
 */
import { Node } from '../Node'

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
  // 1.队列解法
  // const queue = [root]
  // while (queue.length) {
  //   let len = queue.length
  //   for (let i = 0; i < len; i++) {
  //     const node = queue.shift()
  //     if (i !== len - 1) node.next = queue[0]
  //     node.left && queue.push(node.left)
  //     node.right && queue.push(node.right)
  //   }
  // }
  // return root

  // 2.优化,采用链表,每次处理 n + 1 层
  // 将每层试做一个链表,而第一个节点就是链表头节点
  let cur = root
  while (cur) {
    const dummy = new Node(0)
    let pre = dummy
    while (cur) {
      // 左节点存在,则先链接左节点
      if (cur.left) {
        pre.next = cur.left
        pre = pre.next
      }
      // 然后链接右节点
      if (cur.right) {
        pre.next = cur.right
        pre = pre.next
      }
      // 处理下一个节点
      //    1   next => null
      // 2      next => 3  =>  null
      cur = cur.next
    }
    // 开启下一层
    cur = dummy.next
  }
  return root
}
// @lc code=end
