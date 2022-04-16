/*
 * @lc app=leetcode.cn id=203 lang=typescript
 *
 * [203] 移除链表元素
 */

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

function removeElements(head: ListNode | null, val: number): ListNode | null {
  if (!head) return head
  // 解法一: 直接递归到最后一个元素,从最后开始处理
  // head.next = removeElements(head.next, val)
  // 当 `head.val === val` 的时候,返回下一个元素,越过当前节点
  // return head.val === val ? head.next : head

  // 解法二: 遍历
  const sentry = { next: head }
  let p = sentry
  while (p.next) {
    if (p.next.val === val) {
      p.next = p.next.next
    } else {
      p = p.next
    }
  }
  return sentry.next
}
// @lc code=end
