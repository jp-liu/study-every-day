class Heap {
  compare
  arr

  constructor(compare = (a, b) => a > b) {
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
  push(v) {
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
  shiftUp(k) {
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
  sinkDown(k) {
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
  swap(i, j) {
    ;[this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]]
  }

  /**
   * 分支节点的左子节点
   */
  left(k) {
    return k * 2
  }

  /**
   * 分支节点的右子节点
   */
  right(k) {
    return k * 2 + 1
  }

  /**
   * 子节点的父节点
   */
  parent(k) {
    return (k >> 1) | 0
  }
}

module.exports = Heap

const heap = new Heap((a, b) => a > b)
heap.push(1)
heap.push(2)
heap.push(3)
heap.push(4)
heap.push(5)
console.log(heap.peek())
console.log(heap.pop())
console.log(heap.size)

const heap1 = new Heap((a, b) => a < b)
heap1.push(1)
heap1.push(2)
heap1.push(3)
heap1.push(4)
heap1.push(5)
console.log(heap1.peek())
console.log(heap1.pop())
console.log(heap1.size)
