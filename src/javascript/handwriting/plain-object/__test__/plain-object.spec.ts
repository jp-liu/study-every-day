import isPlainObject from '../is-plain-object'

describe('isPlainObject', () => {
  it('test function', () => {
    class Person {
      constructor(public name: string) {
        this.name = name
      }
    }

    const p1 = new Person('小明')
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject({ a: 1, aaa: 43 })).toBe(true)
    expect(isPlainObject([])).toBe(false)
    expect(isPlainObject(new Date())).toBe(false)
    expect(isPlainObject(123)).toBe(false)
    expect(isPlainObject('123')).toBe(false)

    expect(isPlainObject(p1)).toBe(false)
  })
})
