/*
 * @lc app=leetcode.cn id=295 lang=typescript
 *
 * [295] 数据流的中位数
 */

// @lc code=start
class Heap {
  private compare: <T>(a: T, b: T) => boolean
  private readonly arr: unknown[]

  constructor(compare = (a: unknown, b: unknown) => a > b) {
    // 0是占位符,为了让下标对应二叉树的对应元素
    this.arr = [0]
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
  push(v: unknown) {
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
  private sinkDown(k: number) {
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

class MedianFinder {
  maxHeap: Heap
  minHeap: Heap
  constructor() {
    this.minHeap = new Heap((a, b) => a < b) // 堆顶最小,堆下都是大元素
    this.maxHeap = new Heap((a, b) => a > b) // 堆顶最大,堆下都是小元素
  }

  addNum(num: number): void {
    if (!this.maxHeap.size || num < this.maxHeap.peek()) {
      this.maxHeap.push(num) // 小
    } else {
      this.minHeap.push(num) // 大
    }
    // 平衡数量
    if (this.maxHeap.size - this.minHeap.size > 1) {
      this.minHeap.push(this.maxHeap.pop())
    }
    if (this.minHeap.size > this.maxHeap.size) {
      this.maxHeap.push(this.minHeap.pop())
    }
  }

  findMedian(): number {
    const count = this.maxHeap.size + this.minHeap.size
    if ((count & 1) === 0) {
      return (
        ((this.maxHeap.peek() as number) + (this.minHeap.peek() as number)) >> 1
      )
    }
    return this.maxHeap.peek() as number
  }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
// @lc code=end
export {}
