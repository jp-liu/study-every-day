/*
 * @lc app=leetcode.cn id=215 lang=typescript
 *
 * [215] 数组中的第K个最大元素
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

function findKthLargest(nums: number[], k: number): number {
  // 使用小顶堆,维护一个 k 大小的小顶堆,那么堆顶就是第 k 大的,下面都是比堆顶大的
  const minHeap = new Heap((a, b) => a < b)
  for (const num of nums) {
    minHeap.push(num)
    if (minHeap.size > k) {
      minHeap.pop()
    }
  }
  return minHeap.peek() as number
}
// @lc code=end
export {}

function findKthLargest1(nums: number[], k: number): number {
  return nums.sort((a, b) => b - a)[k - 1]
}
