/*
 * @lc app=leetcode.cn id=100178 lang=typescript
 *
 * [面试题 04.06] 后继者
 */

import { TreeNode } from '../TreeNode'

// @lc code=start
class Node {
  val: number
  next: Node | null
  constructor(val?: number, next?: Node) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

function insert(head: Node | null, x: number): Node | null {
  const t = new Node(x)
  if (head === null) {
    head = t
    t.next = t
    return head
  }

  let cur = head
  let next = head.next
  while (next !== head) {
    // 升序过程
    if (cur.val <= x && x <= next.val) {
      cur.next = t
      t.next = next
      return head
    }

    // 降序过程
    if (cur.val > next.val) {
      // 此时 cur 是最大值，next 是最小值
      if (cur.val <= x || next.val >= x) {
        cur.next = t
        t.next = next
        return head
      }
    }
    cur = cur.next
    next = next.next
  }

  // 如果上面没有结束，则说明所有数值都相等，则在哪里插入都一样
  // 或者，next === head，cur是头节点前一个，经过上面升序和降序排列都不满足的过滤，此时 t 小于头结点插入 头结点之后就行
  cur.next = t
  t.next = next
  return head
}

// @lc code=end
export {}
const head = new Node(3, new Node(5, new Node(1)))
head.next.next.next = head

insert(head, 0)
