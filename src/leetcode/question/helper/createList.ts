import { ListNode } from '../ListNode'

export function createList<T extends any[]>(arr: T) {
  let list = new ListNode()
  const dummy = new ListNode()
  dummy.next = list
  for (let i = 0; i < arr.length; i++) {
    const t = arr[i]
    list.val = t
    list.next = i === arr.length - 1 ? new ListNode() : null
    list = list.next
  }
  return dummy.next
}
export function printList(list: ListNode) {
  let cur = list
  let str = ''
  while (cur) {
    str += cur.val + ' ->'
    cur = cur.next
  }
  console.log(str)
}
