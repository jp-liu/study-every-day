import isPlainObject from '../plain-object/is-plain-object'
import { isArray } from './../helper/utils'

export function extend(
  deepOrTarget: object | boolean,
  ...args: object[]
): object {
  // 默认不进行深拷贝
  let deep = false
  let target = null
  if (typeof deepOrTarget === 'boolean') {
    // 如果第一个参数是布尔值，则给定是否深拷贝
    // 合并对象就是第二个参数，否则是第一个
    deep = deepOrTarget
    target = args.shift()
  } else {
    target = deepOrTarget
  }

  // 不是对象无法拷贝
  if (typeof target !== 'object' && typeof target !== 'function') {
    target = {}
  }

  // 循环被复制的对象
  for (let i = 0; i < args.length; i++) {
    const o = args[i]

    // 避免 extend(a, , c)
    if (o != null) {
      for (const key in o) {
        const src = target[key]
        const copy = o[key]

        // 避免循环引用
        if (target === copy) continue

        // 要拷贝的对象必须是纯对象或者数组，（正则，函数都没必要拷贝，直接用，本来就是一个复用的类型）
        let copyIsArray, clone
        if (
          (deep && copy && isPlainObject(copy)) ||
          (copyIsArray = isArray(copy))
        ) {
          if (copyIsArray) {
            copyIsArray = false
            // 如果被复制对象是数组，而我不是，则需要变成数组
            clone = src && isArray(src) ? src : []
          } else {
            // 同上
            clone = src && isPlainObject(src) ? src : {}
          }

          target[key] = extend(deep, clone, copy)
        } else if (copy !== undefined) {
          target[key] = copy
        }
      }
    }
  }
  return target
}
