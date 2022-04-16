function leftpad(str, length, ch) {
  const len = length - str.length + 1
  return Array(len).join(ch) + str
}
// console.log(leftpad('hello', 10, '0'));

function leftpad1(str, length, ch) {
  // 0             1  1
  // 00            0  2
  // 0000          1  4
  // 00000000      0  8
  // 需要补的数量
  let len = length - str.length
  let total = ''
  while (true) {
    // 奇数+1份
    if (len & 1) {
      total += ch
    }
    // 处理完毕
    if (len === 1) {
      return total + str
    }
    // 加倍也就相当于二进制位左移一位了 << 1
    ch += ch
    // 奇数右移一位,意味着需要补全的内容就要 * 2
    // 不用一份一份来,直接加倍
    len = len >> 1
  }
}
// console.log(leftpad1('hello', 20, '0'));

console.time('left1')
for (let i = 0; i < 10000; i++) {
  leftpad('hello', 10000, '0')
}
console.timeEnd('left1')

console.time('left2')
for (let i = 0; i < 10000; i++) {
  leftpad1('hello', 10000, '0')
}
console.timeEnd('left2')
