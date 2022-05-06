/*
 * @lc app=leetcode.cn id=1305 lang=typescript
 *
 * [1305] 两棵二叉搜索树中的所有元素
 */

import { TreeNode } from '../TreeNode'

// @lc code=start
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

function getAllElements(
  root1: TreeNode | null,
  root2: TreeNode | null
): number[] {
  const nums1: number[] = []
  const nums2: number[] = []
  traverse(root1, nums1)
  traverse(root2, nums2)
  return merge(nums1, nums2)

  function traverse(root: TreeNode | null, arr: number[]) {
    if (!root) return
    traverse(root.left, arr)
    arr.push(root.val)
    traverse(root.right, arr)
  }
}

function merge(nums1: number[], nums2: number[]) {
  const ans: number[] = []
  let index1 = 0
  let index2 = 0
  while (index1 < nums1.length && index2 < nums2.length) {
    const num1 = nums1[index1]
    const num2 = nums2[index2]
    if (num1 === num2) {
      ans.push(num1, num2)
      index1++
      index2++
    } else if (num1 > num2) {
      ans.push(num2)
      index2++
    } else {
      ans.push(num1)
      index1++
    }
  }
  if (index1 < nums1.length) {
    while (index1 < nums1.length) {
      ans.push(nums1[index1])
      index1++
    }
  }
  if (index2 < nums2.length) {
    while (index2 < nums2.length) {
      ans.push(nums2[index2])
      index2++
    }
  }
  return ans
}
// @lc code=end
