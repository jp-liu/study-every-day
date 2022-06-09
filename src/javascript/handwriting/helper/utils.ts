export const hasOwnProperty = Object.prototype.hasOwnProperty
/**
 * @description 判断属性是否当前对象自身属性
 */
export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key)

export const isArray = Array.isArray

export const objectToString = Object.prototype.toString
/**
 * @description 获取数据准确类型
 */
export const toTypeString = (value: unknown): string =>
  objectToString.call(value)
export const toRawType = (val: unknown): string => {
  // extract "RawType" from strings like "[object RawType]"
  return toTypeString(val).slice(8, -1)
}

export const isDate = (val: unknown): val is Date => val instanceof Date
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
