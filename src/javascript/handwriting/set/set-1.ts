class Set<T> {
  private _values: T[]
  constructor(iterator: Iterable<T>) {
    this._values = []
    for (const value of iterator) {
      this.add(value)
    }
  }

  get size() {
    return this._values.length
  }

  add(item: T) {
    if (!this._values.includes(item)) {
      this._values.push(item)
    }
    return this
  }

  has(item: T) {
    return this._values.includes(item)
  }

  delete(item: T) {
    const index = this._values.indexOf(item)
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

let set = new Set([1, 2, 3, 4, 4])
console.log(set.size) // 4

set.delete(1)
console.log(set.has(1)) // false

set.clear()
console.log(set.size) // 0

set = new Set([1, 2, 3, 4, 4])
set.forEach((value, key, set) => {
  console.log(value, key, set.size)
})
// 1 1 4
// 2 2 4
// 3 3 4
// 4 4 4
