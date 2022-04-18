/*
 * @lc app=leetcode.cn id=142 lang=typescript
 *
 * [142] 环形链表 II
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

function detectCycle(head: ListNode | null): ListNode | null {
  if (!head) return head
  // 小学数学题
  // 小明和小红,小明速度是小红的两倍,小明和小红从教室去操场跑圈,小明已经在操场跑步了,小红还在路上,也就是
  // 当小红到操场的时候,小明跑的距离是小红的双倍
  // 设小明速度为 x, 小红速度为 y, 操场长度为 z
  // 小红到操场的时候,小明已经跑了 2y 的距离,操场剩余 z - 2y 的距离
  // 他俩继续跑,小红跑一个 z-2y, 小明跑 2(z-2y) 和小红碰头,此时操场剩余 y 的距离到起点
  // 此时小刚的速度是 y 从教室出发,小红从当前点继续跑,他俩碰头的时候,就是进入环形操场的起点
  let slow = head
  let fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) {
      slow = head
      while (slow !== fast) {
        slow = slow.next
        fast = fast.next
      }
      return slow
    }
  }
  return null
}
// @lc code=end
