/*
 * @lc app=leetcode.cn id=347 lang=typescript
 *
 * [347] 前 K 个高频元素
 */

// @lc code=start
class Heap<T> {
  private compare: (a: T, b: T) => boolean
  arr: T[]

  constructor(compare = (a: T, b: T) => a > b) {
    // 0是占位符,为了让下标对应二叉树的对应元素
    this.arr = [0] as any[]
    this.compare = compare
  }

  /**
   * 堆的大小
   */
  get size() {
    return this.arr.length - 1
  }

  /**
   * 插入一个元素
   */
  push(v: T) {
    this.arr.push(v)
    this.shiftUp(this.size)
  }

  /**
   * 弹出一个元素
   */
  pop() {
    if (!this.size) return null
    this.swap(1, this.size)
    const head = this.arr.pop()
    this.sinkDown(1)
    return head
  }

  /**
   * 堆顶元素
   */
  peek() {
    return this.arr[1]
  }

  /**
   * 插入上浮操作
   */
  private shiftUp(k: number) {
    const { arr, parent, compare } = this
    let parentIdx
    while (k > 1 && compare(arr[k], arr[(parentIdx = parent(k))])) {
      this.swap(parentIdx, k)
      k = parentIdx
    }
  }

  /**
   * 删除下沉操作
   */
  sinkDown(k: number) {
    const { arr, size, left, right, compare } = this
    // 下沉到底
    let leftIdx, rightIdx
    while ((leftIdx = left(k)) <= size) {
      // 查看同层,取合适的交换
      if (
        (rightIdx = right(k)) <= size &&
        compare(arr[rightIdx], arr[leftIdx])
      ) {
        leftIdx = rightIdx
      }
      if (compare(arr[k], arr[leftIdx])) {
        return
      }
      this.swap(k, leftIdx)
      k = leftIdx // 继续下沉
    }
  }

  /**
   * 交换位置
   */
  private swap(i: number, j: number) {
    ;[this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]]
  }

  /**
   * 分支节点的左子节点
   */
  private left(k: number) {
    return k * 2
  }

  /**
   * 分支节点的右子节点
   */
  private right(k: number) {
    return k * 2 + 1
  }

  /**
   * 子节点的父节点
   */
  private parent(k: number) {
    return (k >> 1) | 0
  }
}

function topKFrequent(nums: number[], k: number): number[] {
  // 1.收集出现的次数
  const map = {}
  for (const num of nums) {
    map[num] = map[num] ? map[num] + 1 : 1
  }

  // // 2.排序
  // Object.keys(map).sort((a, b) => map[b] - map[a])
  // console.log(map);
  const minHeap = new Heap<string>((a, b) => map[a] < map[b])
  Object.keys(map).forEach((key, idx) => {
    if (idx < k) {
      minHeap.push(key)
    } else if (map[minHeap.peek()] < map[key]) {
      minHeap.arr[1] = key
      minHeap.sinkDown(1)
    }
  })
  return minHeap.arr.slice(1).map(Number)
}
// @lc code=end
export {}
console.log(topKFrequent([5, 2, 5, 3, 5, 3, 1, 1, 3], 2))
