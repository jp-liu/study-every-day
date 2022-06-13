import { deepClone } from '../deep-clone'

describe('深克隆', () => {
  it('深克隆一个对象', () => {
    const foo = { a: 1, b: { a: 2, b: { a: 3, b: 4 } } }
    const clone = deepClone(foo)

    expect(clone === foo).toBeFalsy()
    expect(clone).toEqual({
      a: 1,
      b: {
        a: 2,
        b: {
          a: 3,
          b: 4
        }
      }
    })
  })

  it('深克隆对象加数组', () => {
    const foo = { a: 1, b: { a: 2, b: { a: 3, b: 4 }, c: [1, 2, 3, { a: 5 }] } }
    const clone = deepClone(foo)

    expect(clone === foo).toBeFalsy()
    expect(clone).toEqual({
      a: 1,
      b: {
        a: 2,
        b: {
          a: 3,
          b: 4
        },
        c: [1, 2, 3, { a: 5 }]
      }
    })
  })
})
