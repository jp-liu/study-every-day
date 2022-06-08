export function makeIterator<T>(array: T[], iterator: any) {
  let nextIndex = 0

  return {
    // 实现迭代器协议
    // new Set 调用
    next() {
      return {
        value: iterator(array[nextIndex++]),
        done: nextIndex > array.length
      }
    },
    // 实现可迭代协议
    [Symbol.iterator]() {
      return this
    }
  }
}

export function forOf(obj: object, cb: (val: any) => void) {
  if (typeof obj[Symbol.iterator] !== 'function')
    throw new TypeError(obj + ' is not iterable')
  if (typeof cb !== 'function') throw new TypeError('cb must be callable')
  const iterable = obj[Symbol.iterator]()

  let result = iterable.next()
  while (!result.done) {
    cb(result.value)
    result = iterable.next()
  }
}
