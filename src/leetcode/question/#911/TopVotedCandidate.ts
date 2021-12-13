/*
 * @lc app=leetcode.cn id=911 lang=typescript
 *
 * [911] 在线选举
 */

// @lc code=start
// 测试用例需要 `export` 提交的时候不能有，不然会报错
export class TopVotedCandidate {
  top: number[]
  times: number[]
  map: Map<number, number>
  constructor(persons: number[], times: number[]) {
    this.top = [] // 类似前缀和，之前发生的计票已经不会改变了，计算出之前时刻的 top
    this.times = times
    this.map = new Map() // 存放选举人的票数
    this.map.set(-1, -1) // 一开始都是没有的
    let top = -1
    for (let i = 0; i < persons.length; i++) {
      const p = persons[i]
      if (!this.map.has(p)) {
        this.map.set(p, 1)
      } else {
        this.map.set(p, this.map.get(p) + 1)
      }

      if (this.map.get(p) >= this.map.get(top)) {
        top = p
      }
      // 将当前排名第一加入前缀和
      this.top.push(top)
    }
  }

  q(t: number): number {
    let l = 0
    let r = this.times.length - 1
    // 找到满足 times[l] <= t 的最大的 l
    while (l < r) {
      const mid = l + Math.floor((r - l + 1) / 2)
      if (this.times[mid] <= t) {
        l = mid
      } else {
        r = mid - 1
      }
    }
    return this.top[l]
  }
}

/**
 * Your TopVotedCandidate object will be instantiated and called as such:
 * var obj = new TopVotedCandidate(persons, times)
 * var param_1 = obj.q(t)
 */
// @lc code=end
