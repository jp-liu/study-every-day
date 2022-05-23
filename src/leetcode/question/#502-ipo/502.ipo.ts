/*
 * @lc app=leetcode.cn id=502 lang=typescript
 *
 * [502] IPO
 */

// @lc code=start
class Heap<T> {
  private compare: (a: T, b: T) => boolean
  private arr: T[]

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

function findMaximizedCapital(
  k: number,
  w: number,
  profits: number[],
  capital: number[]
): number {
  // 1.记录资本和利润关系
  const arr = capital.map((c, i) => [c, profits[i]])
  // 2.根据启动资金进行排序
  arr.sort((a, b) => a[0] - b[0])
  let cur = 0 // 记录当前项目
  const maxHeap = new Heap<number>((a, b) => a > b)
  while (k > 0) {
    // 记录每一个能够启动的项目,堆顶是利润最大的
    while (cur < arr.length && arr[cur][0] <= w) {
      maxHeap.push(arr[cur][1])
      cur++
    }
    // 只要有能赚钱机会,就把最赚钱的安排上
    if (maxHeap.size > 0) {
      w += maxHeap.pop()
    } else {
      break
    }
    k--
  }
  return w
}
// @lc code=end
export {}
console.log(findMaximizedCapital(2, 0, [1, 2, 3], [0, 1, 1]))
