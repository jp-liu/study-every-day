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
})
