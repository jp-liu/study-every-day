/*
 * @lc app=leetcode.cn id=232 lang=typescript
 *
 * [232] 用栈实现队列
 */

// @lc code=start
class MyQueue {
  stack1: any[]
  stack2: any[]
  constructor() {
    this.stack1 = []
    this.stack2 = []
  }

  push(x: number): void {
    this.stack1.push(x)
  }

  pop(): number {
    if (this.stack2.length) {
      return this.stack2.pop()
    }
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop())
    }
    return this.stack2.pop()
  }

  peek(): number {
    const x = this.pop()
    this.stack2.push(x)
    return x
  }

  empty(): boolean {
    return !this.stack1.length && !this.stack2.length
  }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
// @lc code=end
