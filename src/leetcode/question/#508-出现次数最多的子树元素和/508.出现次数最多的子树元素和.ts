/*
 * @lc app=leetcode.cn id=508 lang=typescript
 *
 * [508] 出现次数最多的子树元素和
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

function findFrequentTreeSum(root: TreeNode | null): number[] {
  const map = new Map()

  let max = 0
  const dfs = (root: TreeNode | null): number => {
    if (!root) return 0
    const leftNum = dfs(root.left)
    const rightNum = dfs(root.right)

    const sum = leftNum + rightNum + root.val
    if (map.has(sum)) map.set(sum, map.get(sum) + 1)
    else map.set(sum, 1)
    max = Math.max(map.get(sum), max)

    return sum
  }
  dfs(root)

  const ans = []
  for (const [key, value] of map) {
    if (value === max) ans.push(key)
  }
  return ans
}
// @lc code=end
