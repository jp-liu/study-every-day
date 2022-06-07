/*
 * @lc app=leetcode.cn id=875 lang=typescript
 *
 * [875] 爱吃香蕉的珂珂
 */

// @lc code=start
function minEatingSpeed(piles: number[], h: number): number {
  // 题目条件:
  // 1.吃一堆香蕉,不管是否在一个小时内吃完,都不会去吃另一堆, 所以每堆香蕉时间是独立的
  // 2.要查询最小速度
  // 3.区间是 1 => 最大堆, 如果小时小于 length 则是不可能吃完的, 最快是一次一堆
  // 所以,我们可以在这个区间内寻找能够吃完香蕉,速度又最小的,吃香蕉方案

  let minSpeed = 1
  let maxSpeed = Math.max(...piles)

  while (minSpeed < maxSpeed) {
    let mid = minSpeed + ((maxSpeed - minSpeed) >> 1)
    // 吃香蕉时间过长,速度太小了,需要加速
    if (calculator(mid) > h) {
      minSpeed = mid + 1
    }
    // 可以吃完,尝试下更小的速度的方案
    else {
      maxSpeed = mid
    }
  }

  return minSpeed

  function calculator(speed: number) {
    let sum = 0
    for (const val of piles) {
      // 条件一:
      // 向上去整,因为吃一堆香蕉就算小于一小时,也算一小时
      sum += Math.ceil(val / speed)
    }
    return sum
  }
}
// @lc code=end
