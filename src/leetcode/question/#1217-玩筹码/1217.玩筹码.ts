/*
 * @lc app=leetcode.cn id=1217 lang=typescript
 *
 * [1217] 玩筹码
 */

// @lc code=start
function minCostToMoveChips(position: number[]): number {
  // 首先,移动两步是不需要花费的
  // 所以,奇数偶数都可以无代价向前向后移动到对应的位置
  // 所以看奇数偶数谁少,就是谁了
  // 例如:
  //   - 奇数少: 偶数无代价移动到一个位置
  //            奇数都移动一位,达到偶数位置,然后无代价移动到对应偶数位即可
  let odd = 0
  for (const v of position) {
    odd += v & 1
  }
  return Math.min(odd, position.length - odd)
}
// @lc code=end
