/*
 * @lc app=leetcode.cn id=429 lang=typescript
 *
 * [429] N 叉树的层序遍历
 */

export class Node {
  val: number
  children: Node[]
  constructor(val?: number) {
    this.val = val === undefined ? 0 : val
    this.children = []
  }
}

// @lc code=start
/**
 * Definition for node.
 * class Node {
 *     val: number
 *     children: Node[]
 *     constructor(val?: number) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = []
 *     }
 * }
 */

function levelOrder(root: Node | null): number[][] {
  const ans: number[][] = []
  if (!root) return ans
  const queue = [root]
  while (queue.length) {
    let len = queue.length
    let curLevel = []
    while (len--) {
      const node = queue.shift()
      curLevel.push(node.val)
      node.children.length && node.children.forEach(child => queue.push(child))
    }
    ans.push(curLevel)
  }
  return ans
}
// @lc code=end
