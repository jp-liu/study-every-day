import { extend } from '../extend'
describe('extend', () => {
  it('浅层扩展拷贝', () => {
    const obj1 = {
      a: 1,
      b: { b1: 1, b2: 2 }
    }

    const obj2 = {
      b: { b1: 3, b3: 4 },
      c: 3
    }

    const obj3 = {
      d: 4
    }
    const res = extend(obj1, obj2, obj3)
    const res1 = extend(false, obj1, obj2, obj3)
    const equal = {
      a: 1,
      b: { b1: 3, b3: 4 },
      c: 3,
      d: 4
    }
    expect(res).toEqual(equal)
    expect(res1).toEqual(equal)
  })

  it('验证对象', () => {
    const obj1 = { value: { 3: 1 } }
    const obj2 = { value: [1, 2, 3] }
    const res = extend(true, obj1, obj2)
    expect(res).toEqual({
      value: [1, 2, 3]
    })
  })

  it('验证深层对象', () => {
    const obj1 = { value: { 3: 1 }, a: { bb: 'bbb' } }
    const obj2 = { value: [1, 2, 3], a: { aa: 'aaa', reg: /^test$/ } }
    const res = extend(true, obj1, obj2)
    expect(res).toEqual({
      value: [1, 2, 3],
      a: {
        aa: 'aaa',
        bb: 'bbb',
        reg: /^test$/
      }
    })
  })

  it('验证数组', () => {
    const a = extend(true, [4, 5, 6, 7, 8, 9], [1, 2, 3])
    expect(a).toEqual([1, 2, 3, 7, 8, 9])
  })
})
