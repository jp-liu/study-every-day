import { Set } from '../set-3'

describe('Set', () => {
  test('unique value', function () {
    const set = new Set([1, 2, 3, 4, 4])
    expect([...set]).toStrictEqual([1, 2, 3, 4])
  })

  test('unique value', () => {
    const set = new Set(new Set([1, 2, 3, 4, 4]))

    expect([...set]).toStrictEqual([1, 2, 3, 4])
  })

  test('NaN', function () {
    const items = new Set([NaN, NaN])
    expect(items.size).toBe(1)
  })

  test('Object', function () {
    const items = new Set([{}, {}])
    expect(items.size).toBe(2)
  })

  test('set.keys', function () {
    const set = new Set(['red', 'green', 'blue'])
    console.log(set)

    expect([...set]).toEqual(['red', 'green', 'blue'])
  })

  test('set.forEach', () => {
    const temp: number[] = []
    const set = new Set([1, 2, 3])
    set.forEach((value, key) => temp.push(value * 2))
    console.log(temp)

    expect(temp).toEqual([2, 4, 6])
  })
})
