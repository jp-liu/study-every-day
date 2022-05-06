/*
 * @lc app=leetcode.cn id=933 lang=typescript
 *
 * [933] 最近的请求次数
 */

// @lc code=start
class RecentCounter {
  tasks: number[]
  constructor() {
    this.tasks = []
  }

  ping(t: number): number {
    // t - 3000 表示从什么地方作为起点,满足 3000 以内的请求数,小于就是不满足,需要剔除
    while (this.tasks.length && this.tasks[0] < t - 3000) {
      this.tasks.shift()
    }
    this.tasks.push(t)
    return this.tasks.length
  }
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
// @lc code=end
