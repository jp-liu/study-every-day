import { TreeNode } from './../TreeNode'
/*
 * @lc app=leetcode.cn id=105 lang=typescript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 */

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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  // 1.前序遍历，可以确定根节点和分支节点，中序遍历确定的是左右节点
  // 前序遍历: 中 + 左 + 右
  // 中序遍历: 左 + 中 + 右
  // 通过前序获取根节点，通过中序确定左和右
  const n = preorder.length
  const map = new Map<number, number>()
  for (let i = 0; i < n; i++) map.set(inorder[i], i)

  return dfs(0, n - 1, 0, n - 1)

  function dfs(
    preLeft: number,
    preRight: number,
    inLeft: number,
    inRight: number
  ) {
    if (preLeft > preRight) return null

    const rootVal = preorder[preLeft]
    const root = new TreeNode(rootVal)
    const pIndex = map.get(rootVal)
    const leftNum = pIndex - inLeft // 左子节点的个数 + 1 是加根节点，确定左边界
    root.left = dfs(preLeft + 1, leftNum + preLeft, inLeft, pIndex - 1)
    root.right = dfs(leftNum + preLeft + 1, preRight, pIndex + 1, inRight)
    return root
  }
}
// @lc code=end
