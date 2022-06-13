import { hasOwnProperty, toTypeString } from '../helper/utils'

/**
 * 判断一个对象是否是存粹的对象
 * @param { T } obj 被检测对象
 * @returns {boolean}
 */
export default function isPlainObject<T>(obj: T): boolean {
  if (!obj || toTypeString(obj) !== '[object Object]') return false

  const proto = Object.getPrototypeOf(obj)
  if (!proto) {
    return true
  }
  const Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor
  return (
    typeof Ctor === 'function' &&
    hasOwnProperty.toString.call(Ctor) === hasOwnProperty.toString.call(Object)
  )
}

export { isPlainObject }
