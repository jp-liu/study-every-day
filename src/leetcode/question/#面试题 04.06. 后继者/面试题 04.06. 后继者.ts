/*
 * @lc app=leetcode.cn id=100178 lang=typescript
 *
 * [面试题 04.06] 后继者
 */

import { TreeNode } from '../TreeNode'

// @lc code=start
function inorderSuccessor(
  root: TreeNode | null,
  p: TreeNode | null
): TreeNode | null {
  if (!root) return null
  if (root.val <= p.val) return inorderSuccessor(root.right, p)
  const ans = inorderSuccessor(root.left, p)
  return ans !== null ? ans : root
}
// @lc code=end
