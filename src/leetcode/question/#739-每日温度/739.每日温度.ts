/*
 * @lc app=leetcode.cn id=739 lang=typescript
 *
 * [739] 每日温度
 */

// @lc code=start
function dailyTemperatures(t: number[]): number[] {
  const len = t.length
  const ans = new Array(len).fill(0)
  const stack = [0]
  for (let i = 1; i < len; i++) {
    // 单调栈, 单调递增, 只要有栈顶小了,则去除,加入新的元素
    while (stack.length && t[i] > t[stack[stack.length - 1]]) {
      const idx = stack.pop()
      ans[idx] = i - idx
    }
    stack.push(i)
  }
  return ans
}
// @lc code=end
