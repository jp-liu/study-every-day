/*
 * @lc app=leetcode.cn id=621 lang=typescript
 *
 * [621] 任务调度器
 */

// @lc code=start
function leastInterval(tasks: string[], n: number): number {
  if (n === 0) return tasks.length
  // 任务调度器: 不让CPU限制下来,单个任务有冷却时间,冷却时间内,可以做别的任务
  // 所以获取最多的那个任务,在它的冷却时间内,插入别的任务,因为他最多,所以足够插入别的任务
  // 如果没冷却,一个执行完毕,执行下一个,也没啥问题
  const ant = new Array(26).fill(0)
  // 统计任务出现次数
  for (let i = 0; i < tasks.length; i++) {
    ant[tasks[i].charCodeAt(0) - 'A'.charCodeAt(0)]++
  }

  // 获取出现最多的元素
  let max = Math.max(...ant)
  // 去掉尾调用 * (n+1)
  // 最后一个调用的无需处理
  // n+1是一个基准, n = 2,就是 `任务本身+n` 的时间
  let ans = (max - 1) * (n + 1)

  for (let i = 0; i < 26; i++) {
    if (ant[i] === max) {
      ans++
    }
  }
  return Math.max(ans, tasks.length)
}
// @lc code=end
