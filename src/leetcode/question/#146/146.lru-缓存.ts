/*
 * @lc app=leetcode.cn id=146 lang=typescript
 *
 * [146] LRU 缓存
 */

// @lc code=start
class LRUCache {
  cache: Map<number, number>
  max: number
  constructor(capacity: number) {
    this.cache = new Map()
    this.max = capacity
  }

  get(key: number): number {
    if (this.cache.has(key)) {
      const temp = this.cache.get(key)
      this.cache.delete(key)
      this.cache.set(key, temp)
      return temp
    }
    return -1
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else {
      // 新增,判断是否已经最大, 最大,需要将最先进入的删掉,再加
      if (this.cache.size >= this.max) {
        this.cache.delete(this.cache.keys().next().value)
        this.cache.set(key, value)
      }
    }
    this.cache.set(key, value)
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
