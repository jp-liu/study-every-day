const { toString } = require('./helper/utils.js')
/**
 * @description 获取类型
 */
function getType(value) {
  if (value === null) {
    return value + ''
  }
  const v = toString(value)
  return v.slice(8, -1).toLowerCase()
}

console.log(getType(undefined))
console.log(getType('123'))
console.log(getType(123))
console.log(getType([]))
