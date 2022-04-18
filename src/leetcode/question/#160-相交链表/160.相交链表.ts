/*
 * @lc app=leetcode.cn id=160 lang=typescript
 *
 * [160] 相交链表
 */

import { ListNode } from '../ListNode'

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  // 两个链表长度不同,遍历不太好确定位置
  // 那就给他整成相同的 headA + headB length = headB + headA length
  let curA = headA
  let curB = headB
  while (curA !== curB) {
    curA = curA === null ? headB : curA.next
    curB = curB === null ? headA : curB.next
  }
  // AB一样
  return curA
}
// @lc code=end
