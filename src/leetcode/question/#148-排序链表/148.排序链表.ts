/*
 * @lc app=leetcode.cn id=148 lang=typescript
 *
 * [148] 排序链表
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

function sortList(head: ListNode | null): ListNode | null {
  const arr = []
  while (head) {
    arr.push(head)
    head = head.next
  }
  arr.sort((a, b) => a.val - b.val)
  const newHead = new ListNode(0)
  let p = newHead
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i]
    temp.next = null
    p.next = temp
    p = p.next
  }
  return newHead.next
}
// @lc code=end
