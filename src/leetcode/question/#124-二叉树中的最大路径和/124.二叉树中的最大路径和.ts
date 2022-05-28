/*
 * @lc app=leetcode.cn id=124 lang=typescript
 *
 * [124] 二叉树中的最大路径和
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

function maxPathSum(root: TreeNode | null): number {
  let ans = -Infinity
  const dfs = (node: TreeNode | null): number => {
    if (!node) return 0
    const leftMax = Math.max(0, dfs(node.left))
    const rightMax = Math.max(0, dfs(node.right))

    // left->root->right 一个分支作为一个计算点,和之前的路径和比较
    ans = Math.max(ans, node.val + leftMax + rightMax)

    // 左右两条边只有一条能向上走,是单向的路径,动态规划的决策点
    return node.val + Math.max(leftMax, rightMax)
  }
  dfs(root)
  return ans
}

/*
1.路径最少一个节点
2.可以不通过根节点,不通过根节点就是左右子节点中最大路径和
采用dfs, 计算每一个分支节点的最优路线,以及最大路径和
// 左右两条边只有一条能向上走,是单向的路径
return node.val + Math.max(leftMax, rightMax)
*/

// @lc code=end

const root = new TreeNode(
  -10,
  new TreeNode(-9),
  new TreeNode(-20, new TreeNode(-15), new TreeNode(-7))
)

console.log(maxPathSum(root))
