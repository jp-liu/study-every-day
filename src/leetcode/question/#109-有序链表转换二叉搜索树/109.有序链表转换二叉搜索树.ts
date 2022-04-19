/*
 * @lc app=leetcode.cn id=109 lang=typescript
 *
 * [109] 有序链表转换二叉搜索树
 */

import { ListNode } from '../ListNode'
import { TreeNode } from '../TreeNode'

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

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function sortedListToBST(head: ListNode | null): TreeNode | null {
  // 1.借用108的数组转为链表
  if (!head) return null
  // const nums = []
  // let cur = head
  // while (cur) {
  //   nums.push(cur.val)
  //   cur = cur.next
  // }
  // return sortedArrayToBST(nums)

  // 2.快慢指针
  const traverse = (head: ListNode, tail: ListNode | null) => {
    // 首位相交,则这段链表已经处理完毕
    if (head === tail) return null
    let slow = head
    let fast = head

    // 二分之后,
    // 奇数情况下,快指针在到中间,也就是 fast === tail,就算是结尾了
    while (fast !== tail && fast.next !== tail) {
      slow = slow.next
      fast = fast.next.next
    }
    const root = new TreeNode(slow.val)
    root.left = traverse(head, slow)
    root.right = traverse(slow.next, tail)
    return root
  }
  return traverse(head, null)
}
function sortedArrayToBST(nums: number[]): TreeNode | null {
  if (nums.length === 0) {
    return null
  }
  // 平衡二叉搜索树,就是要将左右子树高度限制,最好的最简单的办法就是直接二分,一遍一半,就不会超了
  const mid = Math.floor(nums.length / 2)
  const root = new TreeNode(nums[mid])
  root.left = sortedArrayToBST(nums.slice(0, mid))
  root.right = sortedArrayToBST(nums.slice(mid + 1))
  return root
}
// @lc code=end
