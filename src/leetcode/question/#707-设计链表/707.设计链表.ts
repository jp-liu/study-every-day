/*
 * @lc app=leetcode.cn id=707 lang=typescript
 *
 * [707] 设计链表
 */

// @lc code=start
class LinkNode {
  val: number
  next: null | LinkNode
  constructor(val: number, next: LinkNode | null = null) {
    this.val = val
    this.next = next
  }
}
class MyLinkedList {
  head: null | LinkNode
  tail: null | LinkNode
  length: number
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  get(index: number): number {
    const node = this.getNode(index)
    return node ? node.val : -1
  }

  addAtHead(val: number): void {
    const node = new LinkNode(val, this.head)
    this.head = node
    if (!this.tail) this.tail = node
    this.length++
  }

  addAtTail(val: number): void {
    const node = new LinkNode(val)
    if (this.tail) {
      this.tail.next = node
      this.tail = node
    } else {
      this.head = this.tail = node
    }
    this.length++
  }

  addAtIndex(index: number, val: number): void {
    if (index > this.length) return
    if (index === this.length) {
      this.addAtTail(val)
      return
    }
    if (index <= 0) {
      this.addAtHead(val)
      return
    }
    const node = this.getNode(index - 1)
    node.next = new LinkNode(val, node.next)
    this.length++
  }

  deleteAtIndex(index: number): void {
    if (index < 0 || index >= this.length) return
    if (index === 0) {
      this.head = this.head.next
      this.length--
      return
    }
    const node = this.getNode(index - 1)
    node.next = node.next.next
    if (index === this.length - 1) {
      this.tail = node
    }
    this.length--
  }

  getNode(index: number): LinkNode | null {
    if (index < 0 || index >= this.length) return null
    let cur = this.head
    while (index--) {
      cur = cur.next
    }
    return cur
  }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
// @lc code=end

// ["MyLinkedList","addAtHead","deleteAtIndex"]
// [[],[1],[0]]
const linkedList = new MyLinkedList()
console.log(linkedList.addAtHead(1))
linkedList.deleteAtIndex(0)
linkedList.addAtTail(3)
linkedList.addAtIndex(1, 2) //链表变为1-> 2-> 3
linkedList.get(1) //返回2
linkedList.deleteAtIndex(1) //现在链表是1-> 3
linkedList.get(1) //返回3
