/*
 * @lc app=leetcode.cn id=649 lang=typescript
 *
 * [649] Dota2 参议院
 */

// @lc code=start
function predictPartyVictory(senate: string): string {
  const meta = senate.split('')
  // RD二者属于互相抵消的关系,所以用栈维护,和括号一样
  const stack: string[] = []
  while (meta[0]) {
    const d = meta.shift()
    // 如果和栈顶相同则继续入栈
    if (stack.length === 0 || stack.at(-1) === d) {
      stack.push(d)
    }
    // 不同则当前元素被上一个否定,不作任何操作
    // 将上一个元素重新返回队列,他投的票还有效,等待处理
    else {
      meta.push(stack.pop())
    }
    // R 取消了下一个 D 的权利
    // stack = [R]
    // d == D 的时候, D 下场
  }

  return stack.pop() === 'R' ? 'Radiant' : 'Dire'
}
// @lc code=end
