/*
 * @lc app=leetcode.cn id=731 lang=typescript
 *
 * [731] 我的日程安排表 II
 */

// @lc code=start
const MAX_RANGE = 1e9
class MyCalendarTwo {
  st: SegmentTree
  constructor() {
    this.st = new SegmentTree()
  }

  book(start: number, end: number): boolean {
    if (this.st.query(this.st.root, 0, MAX_RANGE, start, end - 1) < 2) {
      this.st.update(this.st.root, 0, MAX_RANGE, start, end - 1, 1)
      return true
    }
    return false
  }
}

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(start,end)
 */

class SegNode {
  ls: SegNode
  rs: SegNode
  val: number
  add: number

  constructor() {
    this.ls = this.rs = null
    this.val = this.add = 0
  }
}

class SegmentTree {
  root: SegNode

  constructor() {
    this.root = new SegNode()
  }

  update(
    node: SegNode,
    lc: number,
    rc: number,
    l: number,
    r: number,
    v: number
  ): void {
    if (l <= lc && rc <= r) {
      node.val += v
      node.add += v
      return
    }
    this.pushdown(node)
    const mid = (lc + rc) >> 1
    if (l <= mid) {
      this.update(node.ls, lc, mid, l, r, v)
    }
    if (r > mid) {
      this.update(node.rs, mid + 1, rc, l, r, v)
    }
    this.pushup(node)
  }

  query(node: SegNode, lc: number, rc: number, l: number, r: number): number {
    if (l <= lc && rc <= r) {
      return node.val
    }
    this.pushdown(node)
    let ans = 0
    const mid = (lc + rc) >> 1
    if (l <= mid) {
      ans = this.query(node.ls, lc, mid, l, r)
    }
    if (r > mid) {
      ans = Math.max(ans, this.query(node.rs, mid + 1, rc, l, r))
    }
    return ans
  }

  pushup(node: SegNode): void {
    node.val = Math.max(node.ls.val, node.rs.val)
  }

  pushdown(node: SegNode): void {
    if (node.ls == null) {
      node.ls = new SegNode()
    }
    if (node.rs == null) {
      node.rs = new SegNode()
    }
    if (node.add == 0) {
      return
    }
    node.ls.add += node.add
    node.ls.val += node.add
    node.rs.add += node.add
    node.rs.val += node.add
    node.add = 0
  }
}

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(start,end)
 */
// @lc code=end

const myCalendarTwo = new MyCalendarTwo()
myCalendarTwo.book(10, 20) // returns true
myCalendarTwo.book(50, 60) // returns true
myCalendarTwo.book(10, 40) // returns true
myCalendarTwo.book(5, 15) // returns false
myCalendarTwo.book(5, 10) // returns true
myCalendarTwo.book(25, 55) // returns true
