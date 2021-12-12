/**
 * @description 去重函数
 * @param { T[] } arr 被去重的数组
 * @param { string } key 去重使用的关键字
 */
export function unique<T>(arr: T[], key?: string): T[] {
  // 初稿
  /* for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (key) {
        if ((arr[i] as any)[key] === (arr[j] as any)[key]) {
          arr.splice(j, 1)
          j--
        }
      } else {
        if (arr[i] === arr[j]) {
          arr.splice(j, 1)
          j--
        }
      }
    }
  }
  return arr */

  // 重构
  if (!key) return [...new Set(arr)]

  // 临时 keys 数组,用于比较
  const keys: string[] = []

  return arr.reduce((res, cur) => {
    if (!keys.includes((cur as any)[key])) {
      keys.push((cur as any)[key])
      res.push(cur)
    }
    return res
  }, [])
}
