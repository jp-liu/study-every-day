/**
 * @description 简单的日期格式化
 * @param { Date } time 日期
 * @param { string } format 格式化
 */
function dateFormat(time, format) {
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  format = format.replace(/yyyy/, year)
  format = format.replace(/MM/, month)
  format = format.replace(/dd/, day)
  return format
}

console.log(dateFormat(new Date('2020-12-01'), 'yyyy年MM月dd')) // 2020/12/01
console.log(dateFormat(new Date('2020-12-01'), 'yyyy 年 MM 月 dd')) // 2020/12/01
