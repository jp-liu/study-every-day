/*
 * @lc app=leetcode.cn id=1472 lang=typescript
 *
 * [1472] 设计浏览器历史记录
 */

// @lc code=start
class BrowserHistory {
  stack: string[]
  cur: number
  constructor(homepage: string) {
    this.stack = [homepage]
    this.cur = 0
  }

  visit(url: string): void {
    // cur 记录了当前在哪一个页面中,
    // 如果直接访问,则历史记录由前面加当前访问页面,后面的被清除了
    // 所以 length = this.cur + 1 则是清除后面无效不可通过 forward 访问的压面
    this.stack.length = this.cur + 1
    this.stack.push(url)
    this.cur++
  }

  back(steps: number): string {
    // 历史记录共 3 条,你后退 5 步,是不可能的
    this.cur = Math.max(0, this.cur - steps)
    return this.stack[this.cur]
  }

  forward(steps: number): string {
    // 历史记录一共 5 条,要前进 10 步,也无法做到
    this.cur = Math.min(this.stack.length - 1, this.cur + steps)
    return this.stack[this.cur]
  }
}

/**
 * Your BrowserHistory object will be instantiated and called as such:
 * var obj = new BrowserHistory(homepage)
 * obj.visit(url)
 * var param_2 = obj.back(steps)
 * var param_3 = obj.forward(steps)
 */
// @lc code=end

const h = new BrowserHistory('leetcode.com')
console.log(h.visit('google.com'))
console.log(h.visit('facebook.com'))
console.log(h.visit('youtube.com'))
console.log(h.back(1))
console.log(h.back(1))
console.log(h.forward(1))
console.log(h.visit('linkedin.com'))
console.log(h.forward(2))
console.log(h.back(2))
console.log(h.back(7))
