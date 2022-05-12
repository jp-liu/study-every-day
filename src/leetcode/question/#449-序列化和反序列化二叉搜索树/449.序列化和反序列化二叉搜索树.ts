/*
 * @lc app=leetcode.cn id=449 lang=typescript
 *
 * [449] 序列化和反序列化二叉搜索树
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

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
  if (!root) return ''
  const postOrder: number[] = []
  const dfs = (root: TreeNode | null) => {
    if (root) {
      dfs(root.left)
      dfs(root.right)
      postOrder.push(root.val)
    }
  }
  dfs(root)
  return postOrder.join(',')
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  if (!data.length) return null
  // 转化 Number,不然会比较错误
  const list = data.split(',').map(Number)
  // 后序遍历,左右中, 所以根节点在最后,我们从后向前处理即可
  const dfs = (lower: number, upper: number, list: number[]) => {
    // list[list.length - 1] 子树根节点, 右子树要小于根节点, 左子树要大于根节点
    if (
      list.length <= 0 ||
      list[list.length - 1] < lower ||
      list[list.length - 1] > upper
    ) {
      return null
    }
    const val = list.pop()
    const root = new TreeNode(val)
    // 右节点比根节点大,所以val 放前面,因为后序遍历,反序列化是倒着来的
    // list[list.length - 1] 须大于 lower
    root.right = dfs(val, upper, list)

    // 左节点碧根节点小, val 放第二个
    // list[list.length - 1] 需要小于 upper
    root.left = dfs(lower, val, list)
    return root
  }

  return dfs(-Infinity, Infinity, list)
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end

/*
 * Encodes a tree to a single string.
 */
function serialize1(root: TreeNode | null): string {
  if (!root) return ''
  const list: number[] = []
  dfs1(root, list)
  // 采用先序遍历,序列化BST
  return list.join(',')
}

function dfs1(node: TreeNode | null, list: number[]) {
  if (!node) return
  list.push(node.val)
  dfs1(node.left, list)
  dfs1(node.right, list)
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize1(data: string): TreeNode | null {
  if (!data.length) return null
  // 转化 Number,不然会比较错误
  const list = data.split(',').map(item => +item)
  return dfs2(0, list.length - 1, list)
}

function dfs2(l: number, r: number, list: number[]) {
  if (l > r) return null
  let j = l + 1,
    t = list[l]
  const root = new TreeNode(t)
  // 二叉搜索树的左子树的值都比右子树小,j记录左子树的边界
  while (j <= r && list[j] <= t) j++
  // l+1, j -1 左子树的有效范围
  root.left = dfs2(l + 1, j - 1, list)
  // j, r 右子树的有效范围
  root.right = dfs2(j, r, list)
  return root
}
