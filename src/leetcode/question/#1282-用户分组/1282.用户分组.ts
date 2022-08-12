/*
 * @lc app=leetcode.cn id=1282 lang=typescript
 *
 * [1282] 用户分组
 */

// @lc code=start
function groupThePeople(gs: number[]): number[][] {
  const map = new Map<number, Array<number>>()
  for (let i = 0; i < gs.length; i++) {
    if (!map.has(gs[i])) map.set(gs[i], new Array<number>())
    map.get(gs[i]).push(i)
  }
  const ans = new Array<Array<number>>()
  for (let k of map.keys()) {
    let list = map.get(k),
      cur = new Array<number>()
    for (let i = 0; i < list.length; i++) {
      cur.push(list[i])
      if (cur.length == k) {
        ans.push(cur)
        cur = new Array<number>()
      }
    }
  }
  return ans
}

// @lc code=end
