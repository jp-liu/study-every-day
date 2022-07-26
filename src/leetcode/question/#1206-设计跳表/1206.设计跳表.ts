/*
 * @lc app=leetcode.cn id=1206 lang=typescript
 *
 * [1206] 设计跳表
 */

// @lc code=start
const MAX_LEVEL = 32
const P_FACTOR = 0.25
class Skiplist {
  public MAX_LEVEL = 32
  public P_FACTOR = 0.25
  public head: SkiplistNode
  public level: number
  constructor() {
    this.head = new SkiplistNode(-1, MAX_LEVEL)
    this.level = 0
  }

  search(target: number): boolean {
    let curr = this.head
    for (let i = this.level - 1; i >= 0; i--) {
      /* 找到第 i 层小于且最接近 target 的元素*/
      while (curr.forward[i] && curr.forward[i].val < target) {
        curr = curr.forward[i]
      }
    }
    curr = curr.forward[0]
    /* 检测当前元素的值是否等于 target */
    if (curr && curr.val === target) {
      return true
    }
    return false
  }

  add(num: number): void {
    const update = new Array(MAX_LEVEL).fill(this.head)
    let curr = this.head
    for (let i = this.level - 1; i >= 0; i--) {
      /* 找到第 i 层小于且最接近 num 的元素*/
      while (curr.forward[i] && curr.forward[i].val < num) {
        curr = curr.forward[i]
      }
      update[i] = curr
    }
    const lv = randomLevel()
    this.level = Math.max(this.level, lv)
    const newNode = new SkiplistNode(num, lv)
    for (let i = 0; i < lv; i++) {
      /* 对第 i 层的状态进行更新，将当前元素的 forward 指向新的节点 */
      newNode.forward[i] = update[i].forward[i]
      update[i].forward[i] = newNode
    }
  }

  erase(num: number): boolean {
    const update = new Array(MAX_LEVEL).fill(0)
    let curr = this.head
    for (let i = this.level - 1; i >= 0; i--) {
      /* 找到第 i 层小于且最接近 num 的元素*/
      while (curr.forward[i] && curr.forward[i].val < num) {
        curr = curr.forward[i]
      }
      update[i] = curr
    }
    curr = curr.forward[0]
    /* 如果值不在存则返回 false */
    if (!curr || curr.val !== num) {
      return false
    }
    for (let i = 0; i < this.level; i++) {
      if (update[i].forward[i] !== curr) {
        break
      }
      /* 对第 i 层的状态进行更新，将 forward 指向被删除节点的下一跳 */
      update[i].forward[i] = curr.forward[i]
    }
    /* 更新当前的 level */
    while (this.level > 1 && !this.head.forward[this.level - 1]) {
      this.level--
    }
    return true
  }
}

const randomLevel = () => {
  let lv = 1
  /* 随机生成 lv */
  while (Math.random() < P_FACTOR && lv < MAX_LEVEL) {
    lv++
  }
  return lv
}

class SkiplistNode {
  public forward: SkiplistNode[]
  constructor(public val: number, maxLevel: number) {
    this.val = val
    this.forward = new Array(maxLevel).fill(0)
  }
}

/**
 * Your Skiplist object will be instantiated and called as such:
 * var obj = new Skiplist()
 * var param_1 = obj.search(target)
 * obj.add(num)
 * var param_3 = obj.erase(num)
 */
// @lc code=end
