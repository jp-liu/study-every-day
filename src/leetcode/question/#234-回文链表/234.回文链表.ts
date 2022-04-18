/*
 * @lc app=leetcode.cn id=234 lang=typescript
 *
 * [234] 回文链表
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

function isPalindrome(head: ListNode | null): boolean {
  // 解题思路,回文,左右一样,
  // 那就走到中间分割,反转前面的, 然后同步向后,相同则为回文,一个不同,则不是回文
  let slow = head
  let fast = head
  let prev = null
  while (fast && fast.next) {
    fast = fast.next.next
    let next = slow.next
    slow.next = prev
    prev = slow
    slow = next // slow = slow.next
  }
  // 奇数个节点,slow在正中间
  if (fast) {
    slow = slow.next
  }
  while (prev) {
    if (slow.val === prev.val) {
      slow = slow.next
      prev = prev.next
    } else {
      return false
    }
  }
  return true
}
// @lc code=end
