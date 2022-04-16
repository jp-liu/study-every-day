/*
 * @lc app=leetcode.cn id=141 lang=typescript
 *
 * [141] 环形链表
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

function hasCycle(head: ListNode | null): boolean {
  // 1.解法一: 存储出现过的节点
  // const cache = new Set()
  // while (head) {
  //   if (cache.has(head)) {
  //     return true
  //   } else {
  //     cache.add(head)
  //   }
  //   head = head.next
  // }
  // return false

  // 2.解法二: 快慢双指针
  let slow = head
  let fast = head
  // 没环: 到末尾,快指针就没有 `next`了
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      return true
    }
  }
  return false
}
// @lc code=end
