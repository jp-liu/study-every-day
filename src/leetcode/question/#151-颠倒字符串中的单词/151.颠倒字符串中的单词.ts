/*
 * @lc app=leetcode.cn id=151 lang=typescript
 *
 * [151] 颠倒字符串中的单词
 */

// @lc code=start
function reverseWords(s: string): string {
  // const stack: string[] = []
  // let left = 0
  // let right = s.length - 1
  // let word = ''
  // // 去除头尾空格
  // while (s.charAt(left) === ' ') {
  //   left++
  // }
  // while (s.charAt(right) === ' ') {
  //   right--
  // }

  // while (left <= right) {
  //   // 不是空格就是字母
  //   if (s.charAt(left) !== ' ') {
  //     word += s[left]
  //   } else if (word) {
  //     stack.push(word)
  //     word = ''
  //   }
  //   left++
  // }
  // // 最后一个元素
  // if (word) stack.push(word)
  // return stack.reverse().join(' ')

  // 直接语言语法
  return s.split(' ').filter(Boolean).reverse().join(' ')
}
// @lc code=end
