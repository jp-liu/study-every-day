import { unique } from '../unique'

describe('handwriting', () => {
  it('unique', () => {
    expect(unique([1, 1, 2, 2, 3, 3]).toString()).toBe([1, 2, 3].toString())

    const arr = [
      {
        id: 1,
        name: 'a'
      },
      {
        id: 1,
        name: 'b'
      },
      { id: 2, name: 'c' }
    ]
    expect(unique(arr, 'id').length).toBe(
      [
        {
          id: 1,
          name: 'a'
        },
        { id: 2, name: 'c' }
      ].length
    )
  })
})
