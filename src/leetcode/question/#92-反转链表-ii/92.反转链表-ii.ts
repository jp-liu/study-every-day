/*
 * @lc app=leetcode.cn id=92 lang=typescript
 *
 * [92] 反转链表 II
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

function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number
): ListNode | null {
  if (!head) return head
  let dummy = new ListNode(null, head)
  let temp = dummy
  for (let i = 0; i < left - 1; i++) {
    temp = temp.next
  }
  let prev = temp.next // 对应 2 => 3 => 4 反转起点,
  let cur = temp.next.next // 对应 3, 3 => 2
  for (let i = 0; i < right - left; i++) {
    let next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  temp.next.next = cur // temp还是指向 2,反转结束点
  temp.next = prev
  return dummy.next
}
// @lc code=end
