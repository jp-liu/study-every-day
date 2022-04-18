/*
 * @lc app=leetcode.cn id=19 lang=typescript
 *
 * [19] 删除链表的倒数第 N 个结点
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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let dummy = {
    next: head
  }

  let slow = dummy
  let fast = dummy
  while (n--) {
    fast = fast.next
  }
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next
  }
  // [1] 1 的时候,哨兵保证了 next.next 的存在
  slow.next = slow.next.next

  return dummy.next
}
// @lc code=end
