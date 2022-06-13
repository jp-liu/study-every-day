import { isArray, isObject } from '../helper/utils'

export function deepClone<T = any>(target: T, map = new WeakMap()) {
  if (target instanceof Map) {
    return new Map([...target])
  }

  if (target instanceof Set) {
    return new Set([...target])
  }

  if (typeof target === 'symbol') {
    return Symbol(target.description)
  }

  // 函数直接复用
  if (typeof target === 'function') {
    return target
  }

  // 非对象
  if (!isObject(target)) {
    return target
  }

  // 循环引用
  if (map.has(target as unknown as object)) {
    return map.get(target as unknown as object)
  }

  // 判断对象类别
  const newObject: any = isArray(target) ? [] : {}
  map.set(target as unknown as object, newObject)

  for (const key in target) {
    newObject[key] = deepClone(target[key])
  }

  // 对 `Symbol` 类型的处理
  const symbolKeys = Object.getOwnPropertySymbols(newObject)
  for (const sKey of symbolKeys) {
    newObject[sKey] = deepClone(target[sKey])
  }

  return newObject
}
