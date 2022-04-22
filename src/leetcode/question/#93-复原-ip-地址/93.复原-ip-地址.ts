/*
 * @lc app=leetcode.cn id=93 lang=typescript
 *
 * [93] 复原 IP 地址
 */

// @lc code=start
function restoreIpAddresses(s: string): string[] {
  const ans: string[] = []
  const path: string[] = []
  // 从0元素开始
  backtrack(0)
  return ans
  function backtrack(index: number) {
    // 搜索条件大于4,则不可能满足
    if (path.length > 4) {
      return
    }
    // 如果处理到最后一位,并且次数正好是4个元素,所以正确
    if (path.length === 4 && index === s.length) {
      ans.push(path.join('.'))
      return
    }
    for (let i = index; i < s.length; i++) {
      // 从当前位置截取数字,然后判断是否合格
      const num = s.substring(index, i + 1)
      if (+num > 255 || (num.length > 1 && num[0] === '0')) {
        break
      }
      path.push(num)
      backtrack(i + 1)
      path.pop()
    }
  }
}
// @lc code=end
