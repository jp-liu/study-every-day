/*
 * @lc app=leetcode.cn id=464 lang=typescript
 *
 * [464] 我能赢吗
 */

// @lc code=start
function canIWin(maxChoosableInteger: number, desiredTotal: number): boolean {
  if (maxChoosableInteger >= desiredTotal) return true // 第一步选择最大值直接获胜
  if (maxChoosableInteger * (maxChoosableInteger + 1) < desiredTotal)
    return false // 总和都达不到,不可能获胜
  // 1.判断获胜的条件:
  //  - 1.1 当前玩家抽取卡池之后, 累计值 >= desiredTotal
  //  - 1.2 当前玩家抽取卡池之后,剩余卡池,无论对手如何选择都无法胜利, 当前玩家也获胜
  // 2.枚举任意一种情况,没有啥技巧
  // 缩短时间的技巧: 记忆化, 使用 `位` 标识选择位

  // 记忆化缩短时间复杂度,避免超时
  const visited: number[] = [] // 0: 未使用 1:结果胜利 2:结果失败
  const dfs = (state: number, sum: number) => {
    if (visited[state] === 1) return true
    if (visited[state] === 2) return false
    for (let i = 1; i <= maxChoosableInteger; i++) {
      if ((1 << i) & state) continue // 已经被选择过了
      // 满足条件胜利
      if (sum + i >= desiredTotal) {
        visited[state] = 1
        return true
      }
      // 对手无法获胜也胜利, (1 << i) | state 当前位设置 1 表示使用过
      if (!dfs((1 << i) | state, sum + i)) {
        visited[state] = 1
        return true
      }
    }
    visited[state] = 2
    return false
  }
  // 当前玩家能否获胜
  return dfs(0, 0)
}
// @lc code=end
