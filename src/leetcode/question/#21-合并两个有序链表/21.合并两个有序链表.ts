/*
 * @lc app=leetcode.cn id=21 lang=typescript
 *
 * [21] 合并两个有序链表
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

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  let dummy = new ListNode(null, null)
  let temp = dummy
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      temp.next = list1
      list1 = list1.next
    } else {
      temp.next = list2
      list2 = list2.next
    }
    temp = temp.next
  }
  temp.next = list1 ? list1 : list2

  return dummy.next
}
// @lc code=end
