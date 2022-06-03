/*
 * @lc app=leetcode.cn id=341 lang=typescript
 *
 * [341] 扁平化嵌套列表迭代器
 */

import NestedInteger from '../helper/NestedInteger'

// @lc code=start
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * class NestedInteger {
 *     If value is provided, then it holds a single integer
 *     Otherwise it holds an empty nested list
 *     constructor(value?: number) {
 *         ...
 *     };
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     isInteger(): boolean {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     getInteger(): number | null {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a single integer equal to value.
 *     setInteger(value: number) {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
 *     add(elem: NestedInteger) {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds,
 *     or an empty list if this NestedInteger holds a single integer
 *     getList(): NestedInteger[] {
 *         ...
 *     };
 * };
 */

class NestedIterator {
  nestedList: number[]
  constructor(nestedList: NestedInteger[]) {
    this.nestedList = this.flatArray(nestedList)
  }

  private flatArray(arr: NestedInteger[]): number[] {
    const res = []
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      if (item.isInteger()) {
        res.push(item.getInteger())
      } else {
        res.push(...this.flatArray(item.getList()))
      }
    }
    return res
  }

  hasNext(): boolean {
    return this.nestedList.length > 0
  }

  next(): number {
    return this.nestedList.shift()
  }
}

/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new NestedIterator(nestedList)
 * var a: number[] = []
 * while (obj.hasNext()) a.push(obj.next());
 */
// @lc code=end
