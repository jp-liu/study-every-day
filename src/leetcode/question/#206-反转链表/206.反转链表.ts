/*
 * @lc app=leetcode.cn id=206 lang=typescript
 *
 * [206] 反转链表
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

function reverseList(head: ListNode | null): ListNode | null {
  // if (!head) return head
  // let prev = null
  // let cur = head
  // while (cur) {
  //   let next = cur.next
  //   cur.next = prev
  //   prev = cur
  //   cur = next
  // }
  // return prev
  if (!head || head.next === null) return head
  const node = reverseList(head.next)
  head.next.next = head
  head.next = null
  return node
}
// @lc code=end
