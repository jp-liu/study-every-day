/*
 * @lc app=leetcode.cn id=23 lang=typescript
 *
 * [23] 合并K个升序链表
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

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  // 合并的多个链表,从两个两个合并起来呗
  if (!lists.length) return null

  return mergeLists(lists, 0, lists.length - 1)
}

function mergeLists(
  lists: Array<ListNode | null>,
  start: number,
  end: number
): ListNode | null {
  if (start === end) return lists[start]
  const mid = start + ((end - start) >> 1)
  const leftList = mergeLists(lists, start, mid)
  const rightList = mergeLists(lists, mid + 1, end)

  return merge(leftList, rightList)
}

function merge(head1: ListNode | null, head2: ListNode | null): ListNode {
  let newHead = new ListNode(0)
  let p = newHead
  while (head1 && head2) {
    if (head1.val <= head2.val) {
      p.next = head1
      head1 = head1.next
    } else {
      p.next = head2
      head2 = head2.next
    }
    p = p.next
  }
  head1 && (p.next = head1)
  head2 && (p.next = head2)
  return newHead.next
}
// @lc code=end

console.log(
  mergeKLists([
    new ListNode(1, new ListNode(4, new ListNode(5))),
    new ListNode(1, new ListNode(3, new ListNode(4))),
    new ListNode(2, new ListNode(6))
  ])
)
