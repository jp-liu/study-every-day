const { hasOwn, toString } = require('../helper/utils.js')
/**
 * 判断一个对象是否是存粹的对象
 * @param { T } obj 被检测对象
 * @returns {boolean}
 */
function isPlainObject(obj) {
  if (!obj || toString(obj) !== '[object Object]') return false

  const proto = Object.getPrototypeOf(obj)
  if (!proto) {
    return true
  }
  const Ctor = hasOwn.call(proto, 'constructor') && proto.constructor
  return (
    typeof Ctor === 'function' &&
    hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object)
  )
}

module.exports = isPlainObject
