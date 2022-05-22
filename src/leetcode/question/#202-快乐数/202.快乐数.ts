/*
 * @lc app=leetcode.cn id=202 lang=typescript
 *
 * [202] 快乐数
 */

// @lc code=start
function isHappy(n: number): boolean {
  const obj = {}
  while (true) {
    if (n in obj) return false
    if (n === 1) return true
    obj[n] = true
    n = getNum(n)
  }
}

function getNum(num: number) {
  let sum = 0
  while (num > 0) {
    let bit = num % 10
    sum += bit ** 2
    num = (num / 10) | 0
  }
  return sum
}
// @lc code=end

function isHappy1(n: number): boolean {
  // 双指针判断是否成环,成环则是死循环不会成为 1
  let slow = n
  let fast = n
  do {
    slow = getNum(slow)
    // 如果是 1 会一直在1循环等待 slow, 不是 1 成环也会有一刻相等,退出循环
    fast = getNum(getNum(fast))
  } while (slow !== fast)
  return slow === 1
}

console.log(isHappy(19))
