import { forEach } from '../for-each'
import { unique } from '../unique'

describe('handwriting', () => {
  it('unique', () => {
    expect(unique([1, 1, 2, 2, 3, 3])).toStrictEqual([1, 2, 3])

    const arr = [
      { id: 1, name: 'a' },
      { id: 1, name: 'b' },
      { id: 2, name: 'c' }
    ]

    expect(unique(arr, 'id')).toStrictEqual([
      { id: 1, name: 'a' },
      { id: 2, name: 'c' }
    ])
  })

  it('forEach', () => {
    const arr = [1, 2, 3]
    let i1 = 0
    let i2 = 0
    let i3 = 0
    const fn = jest.fn((item, idx, origin) => {
      expect(origin).toStrictEqual(arr)
      if (idx === 0) {
        i1 = item
      } else if (idx === 1) {
        i2 = item
      } else if (idx === 2) {
        i3 = item
      }
    })
    forEach(arr, fn)
    expect(fn).toHaveBeenCalledTimes(3)
    expect(i1).toBe(1)
    expect(i2).toBe(2)
    expect(i3).toBe(3)
  })
})
