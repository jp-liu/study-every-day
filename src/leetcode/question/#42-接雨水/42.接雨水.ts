/*
 * @lc app=leetcode.cn id=42 lang=typescript
 *
 * [42] 接雨水
 */

// @lc code=start
function trap(height: number[]): number {
  // 能盛水多少是取决于当前 i, 左边和右边的高度最小高度 - 当前高度
  /*                  R
   *                  ■
   * |     L     ■    ■
   * |     ■— — —■— — ■ — — 可以盛水的高度
   * |     ■     ■    ■     就算 R 很高,也不影响计算 i 盛水,因为他是 L - height[i]
   * |     ■  ■  ■    ■     可以盛水的公式就是: Math.min(L, R) - height[i]
   * +------------------
   * 0  1  2  i  i+1  i+2  ...
   */
  const len = height.length
  if (!len) return
  let lMax = height[0]
  let rMax = height[len - 1]

  let left = 0
  let right = len - 1
  let res = 0
  while (left <= right) {
    // 使用双指针获取当前点的左右高度,
    // 并不需要一定是相邻的,因为大不了水延展到最右或者最左,我们只计算当前点的盛水,比如说上图
    lMax = Math.max(lMax, height[left])
    rMax = Math.max(rMax, height[right])
    // Math.min(L, R) - height[i] 变更为左右指针
    if (lMax < rMax) {
      res += lMax - height[left++]
    } else {
      res += rMax - height[right--]
    }
  }
  return res
}
// @lc code=end
console.log(trap([4, 2, 3]))

function trap2(height: number[]): number {
  // 能盛水多少是取决于当前 i, 左边和右边的高度最小高度 - 当前高度
  /*
   *       L
   * |     ■     R
   * |     ■— — —■ — — 可以盛水的高度
   * |     ■     ■     可以盛水的公式就是: Math.min(L, R) - height[i]
   * |     ■  ■  ■
   * +------------------
   * 0  1  2  i  i+1  i+2  ...
   */
  const len = height.length
  if (!len) return
  // 数组充当备忘录
  const lMax = new Array(len)
  const rMax = new Array(len)
  lMax[0] = height[0]
  rMax[len - 1] = height[len - 1]
  // 记录每个点的左边界最高点
  for (let i = 1; i < len; i++) lMax[i] = Math.max(height[i], lMax[i - 1])
  // 记录每个点的右边界最高点
  for (let i = len - 2; i >= 0; i--) rMax[i] = Math.max(height[i], rMax[i + 1])

  let res = 0
  for (let i = 0; i < len; i++) {
    res += Math.min(lMax[i], rMax[i]) - height[i]
  }
  return res
}

function trap1(height: number[]): number {
  // 一行一行求
  const maxHeight = Math.max(...height)

  let sum = 0
  // 遍历行
  for (let i = 1; i <= maxHeight; i++) {
    let isStart = false
    let temp = 0
    // 遍历列
    for (let j = 0; j < height.length; j++) {
      if (isStart && height[j] < i) {
        temp++
      }
      if (height[j] >= i) {
        sum += temp
        temp = 0
        isStart = true
      }
    }
  }
  return sum
}
