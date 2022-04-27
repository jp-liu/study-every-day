/*
 * @lc app=leetcode.cn id=2 lang=typescript
 *
 * [2] 两数相加
 */

import { createList, printList } from '../helper/createList'
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

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const dummy = new ListNode(0)
  let res = dummy
  let carry = 0
  while (l1 || l2) {
    let left = l1 ? l1.val : 0
    let right = l2 ? l2.val : 0
    let sum = left + right + carry
    carry = sum > 9 ? 1 : 0
    res.next = new ListNode(sum % 10)
    res = res.next
    l1 = l1 && l1.next
    l2 = l2 && l2.next
  }
  if (carry > 0) {
    res.next = new ListNode(1)
  }
  return dummy.next
}
// @lc code=end
