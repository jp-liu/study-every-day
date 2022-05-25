/*
 * @lc app=leetcode.cn id=460 lang=typescript
 *
 * [460] LFU 缓存
 */

// @lc code=start
class LFUCache {
  values: Map<number, number>
  useCount: Map<number, number> // key => count
  useKey: Map<number, Set<number>> // count => 相同使用次数的键
  min: number
  size: number
  // 操作平均时间复杂度 O(1)
  // 需要记录使用次数和 key 的关系
  constructor(capacity: number) {
    this.values = new Map()
    this.size = capacity
    this.useCount = new Map()
    this.useKey = new Map()
    this.min = 0
  }

  get(key: number): number {
    if (this.values.has(key)) {
      const value = this.values.get(key)
      this.updateCount(key)
      return value
    }
    return -1
  }

  put(key: number, value: number): void {
    if (this.size === 0) return
    if (this.values.has(key)) {
      this.values.set(key, value)
      this.updateCount(key)
    } else {
      // 越界,删除使用次数最少的
      if (this.values.size >= this.size) {
        const minKeys = this.useKey.get(this.min)
        const minKey = minKeys.keys().next().value
        minKeys.delete(minKey)
        this.values.delete(minKey)
        this.useCount.delete(minKey)
      }
      // 删除后设置新的,还有没越界直接设置新的
      this.values.set(key, value)
      // 更新最小值和次数, 如果有值是在上面更新,这里说明是新增,次数是 1
      this.min = 1
      let keys = this.useKey.get(1) || new Set()
      keys.add(key)
      this.useKey.set(1, keys)
      this.useCount.set(key, 1)
    }
  }

  private updateCount(key: number) {
    // 获取对应的 key, 更新使用次数
    let count = this.useCount.get(key)
    let keys = this.useKey.get(count)
    if (this.min === count && keys.size === 1) {
      // 仅有一个键,且是最少使用次数
      this.min++
    }
    count += 1
    keys.delete(key) // 删除,这个键的使用次数增加了,要重新设置
    keys = this.useKey.get(count) || new Set()
    keys.add(key)
    this.useKey.set(count, keys)
    this.useCount.set(key, count)
  }
}

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end

// ["LFUCache","put","put","get","put","get","get","put","get","get","get"]
// [[2],[1,1],[2,2],[1],[3,3],[2],[3],[4,4],[1],[3],[4]]
const l = new LFUCache(2)
l.put(1, 1)
l.put(2, 2)
l.get(1)
l.put(3, 3)
l.get(2)
l.get(3)
l.put(4, 4)
l.get(1)
l.get(3)
l.get(4)
