/* eslint-disable no-undef */
const isPlainObject = require('../is-plain-object.js')

describe('isPlainObject', () => {
  it('test function', () => {
    function Person(name) {
      this.name = name
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
