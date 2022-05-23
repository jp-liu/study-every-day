/*
 * @lc app=leetcode.cn id=877 lang=typescript
 *
 * [877] 石子游戏
 */

// @lc code=start
function stoneGame(piles: number[]): boolean {
  // 石子堆是偶数堆,那么将石子堆分为奇数堆和偶数堆,那一堆多我就选那一堆,必胜
  // [1, 3, 5, 7] 下标从 1 开始: 1, 3 是奇数,和是6  2, 4 是偶数,和是10, 只要我选7,所有的偶数都是我自己的,必胜的
  return true
}
// @lc code=end
