/**
 * @description 自实现的防抖函数
 */
export function debounce(
  fn: (...args: any[]) => unknown,
  wait: number = 300,
  immediate: boolean = false
) {
  let timeout: any, result: any

  const debounced = function (...args: any[]) {
    const ctx = this

    if (timeout) clearTimeout(timeout)

    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) result = fn.apply(ctx, args)
    } else {
      timeout = setTimeout(() => {
        result = fn.apply(ctx, args)
      }, wait)
    }

    return result
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

const a = debounce((a: number) => console.log(a))
for (let i = 0; i < 30; i++) {
  a(i, 300, true)
}
