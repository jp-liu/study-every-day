/*
 * @lc app=leetcode.cn id=292 lang=typescript
 *
 * [292] Nim 游戏
 */

// @lc code=start
function canWinNim(n: number): boolean {
  // 每次可以拿1-3个石头,那么四个既可以作为一轮游戏,只要轮到4的玩家,就必输
  // 我要赢,就必须保证石子在最后一轮 4 以上
  return n % 4 > 0
}
// @lc code=end
