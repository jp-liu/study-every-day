type ForEachCallBack<T> = (item: T, index: number, originData?: T[]) => void
/**
 * @description 遍历数组
 */
export function forEach<T>(callback: ForEachCallBack<T>): void {
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'myForEach' if null")
  }

  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`)
  }

  const _arr = this
  const _this = arguments[1] || window
  for (let i = 0; i < _arr.length; i++) {
    callback.call(_this, _arr[i], i, _arr)
  }

  // for (let i = 0; i < arr.length; i++) {
  //   callback(arr[i], i, arr)
  // }
}
