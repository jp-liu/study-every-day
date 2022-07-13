/*
 * @lc app=leetcode.cn id=735 lang=typescript
 *
 * [735] 行星碰撞
 */

// @lc code=start
function asteroidCollision(asteroids: number[]): number[] {
  const stack = []
  for (const value of asteroids) {
    let alive = true
    while (alive && value < 0 && stack.length && stack[stack.length - 1] > 0) {
      // 如果栈顶小于 value 则说明 value 要保留，栈顶爆炸
      alive = stack[stack.length - 1] < -value
      if (stack[stack.length - 1] <= -value) {
        stack.pop()
      }
    }
    if (alive) stack.push(value)
  }
  return stack.reverse()
}
// @lc code=end
