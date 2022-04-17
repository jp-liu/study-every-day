/*
 * @lc app=leetcode.cn id=860 lang=typescript
 *
 * [860] 柠檬水找零
 */

// @lc code=start
function lemonadeChange(bills: number[]): boolean {
  let fiveNum = 0
  let tenNum = 0
  for (let i = 0; i < bills.length; i++) {
    const bill = bills[i]
    if (bill === 5) {
      fiveNum++
    } else if (bill === 10) {
      if (fiveNum > 0) {
        fiveNum--
        tenNum++
      } else {
        return false
      }
    } else {
      if (fiveNum > 0 && tenNum > 0) {
        fiveNum--
        tenNum--
      } else if (fiveNum > 2) {
        fiveNum -= 3
      } else {
        return false
      }
    }
  }
  return true
}
lemonadeChange([5, 5, 10, 10, 5, 20, 5, 10, 5, 5])
// @lc code=end
