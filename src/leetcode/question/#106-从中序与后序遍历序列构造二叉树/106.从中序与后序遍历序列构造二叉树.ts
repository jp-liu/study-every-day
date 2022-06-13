import { TreeNode } from './../TreeNode'
/*
 * @lc app=leetcode.cn id=106 lang=typescript
 *
 * [106] 从中序与后序遍历序列构造二叉树
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

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  // 中序遍历：左 + 中 + 右
  // 后续遍历：左 + 右 + 中
  // 后续遍历倒序就是所有的根节点，通过根节点可以获取中序遍历下的左右节点
  let postIndex = postorder.length - 1
  const map = new Map<number, number>()
  for (let i = 0; i <= postIndex; i++) map.set(inorder[i], i)

  const helper = (left: number, right: number) => {
    if (left > right) return null

    const rootVal = postorder[postIndex--]
    const pIndex = map.get(rootVal)

    const root = new TreeNode(rootVal)
    // 后序遍历根节点，是倒着来的，这里也需要倒，先右后左
    root.right = helper(pIndex + 1, right)
    root.left = helper(left, pIndex - 1)
    return root
  }

  return helper(0, postIndex)
}
// @lc code=end
buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3])
