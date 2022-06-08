// 通过数组方法来判断是否重复，存在小问题
// 例如：[NaN].includes(NaN) // false
class Set<T> {
  private _values: T[]
  private NaNSymbol = Symbol('NaN')
  constructor(iterator: Iterable<T>) {
    this._values = []
    for (const value of iterator) {
      this.add(value)
    }
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
}

export {}

const set = new Set([1, 2, 3])

set.add(NaN)
console.log(set.size) // 4

set.add(NaN)
console.log(set.size) // 4
