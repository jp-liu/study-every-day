/*
 * @lc app=leetcode.cn id=155 lang=typescript
 *
 * [155] 最小栈
 */

// @lc code=start
class MinStack {
  stack: number[]
  minValues: number[]
  private last(arr: number[]) {
    return arr[arr.length - 1]
  }
  constructor() {
    this.stack = []
    this.minValues = [Infinity]
  }

  push(val: number): void {
    // 插入时保证最小元素
    const item = Math.min(this.last(this.minValues), val)
    this.stack.push(val)
    this.minValues.push(item)
  }

  pop(): void {
    this.stack.pop()
    this.minValues.pop()
  }

  top(): number {
    return this.last(this.stack)
  }

  getMin(): number {
    return this.last(this.minValues)
  }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
// @lc code=end
