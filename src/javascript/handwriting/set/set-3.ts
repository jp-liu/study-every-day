import { forOf, makeIterator } from './helper/utils'

// 迭代器的实现
export class Set<T> {
  private _values: T[]
  private NaNSymbol = Symbol('NaN')
  constructor(iterator: Iterable<T>) {
    this._values = []
    forOf(iterator, item => {
      this.add(item)
    })
  }

  private encodeVal(val: T) {
    // eslint-disable-next-line no-self-compare
    return val !== val ? this.NaNSymbol : val
  }

  private decodeVal(val: T | symbol) {
    return val === this.NaNSymbol ? NaN : val
  }

  get size() {
    return this._values.length
  }

  add(item: T) {
    item = this.encodeVal(item) as T
    if (!this._values.includes(item)) {
      this._values.push(item)
    }
    return this
  }

  has(item: T) {
    return this._values.includes(this.encodeVal(item) as T)
  }

  delete(item: T) {
    const index = this._values.indexOf(this.encodeVal(item) as T)
    if (index === -1) return false
    this._values.splice(index, 1)
    return true
  }

  clear() {
    this._values = []
  }

  forEach(
    callbackFn: (item?: T, values?: T[], thisArg?: this) => void,
    thisArg?: object | undefined
  ) {
    thisArg = thisArg || global
    for (let i = 0; i < this._values.length; i++) {
      callbackFn.call(thisArg, this._values[i], this._values, this)
    }
  }

  values() {
    return makeIterator(this._values, (value: any) => this.decodeVal(value))
  }

  keys() {
    return this.values()
  }

  entries() {
    return makeIterator(this._values, (value: any) => [
      this.decodeVal(value),
      this.decodeVal(value)
    ])
  }

  [Symbol.iterator]() {
    return this.values()
  }
}

export {}

const set = new Set(new Set([1, 2, 3]))
console.log(set.size) // 3

console.log([...set.keys()]) // [1, 2, 3]
console.log([...set.values()]) // [1, 2, 3]
console.log([...set.entries()]) // [1, 2, 3]
