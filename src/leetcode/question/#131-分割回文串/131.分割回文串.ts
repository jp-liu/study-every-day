/*
 * @lc app=leetcode.cn id=131 lang=typescript
 *
 * [131] 分割回文串
 */

// @lc code=start
function partition(s: string): string[][] {
  const ans: string[][] = []
  const path: string[] = []
  backtrack(0)
  return ans
  function backtrack(index: number) {
    if (index === s.length) {
      ans.push([...path])
      return
    }
    for (let i = index; i < s.length; i++) {
      // substring 是开始下标到结束下标,左闭右开
      // 从当前 index 开始截取到哪里结束
      const str = s.substring(index, i + 1)
      // 从当前下标开始截取几位
      // const str = s.substr(index, i - index + 1)
      if (isPalindrome(str)) {
        path.push(str)
        backtrack(i + 1)
        path.pop()
      }
    }
  }
}
function isPalindrome(str: string) {
  for (let i = 0, j = str.length - 1; i < j; i++, j--) {
    if (str[i] !== str[j]) {
      return false
    }
  }
  return true
}
export {}
// @lc code=end
