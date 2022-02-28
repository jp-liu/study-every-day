function deepClone(originValue) {
  // 判断是否是一个Set类型
  if (originValue instanceof Set) {
    return new Set([...originValue])
  }

  // 判断是否是一个Map类型
  if (originValue instanceof Map) {
    return new Map([...originValue])
  }

  // 判断如果是Symbol的value, 那么创建一个新的Symbol
  if (typeof originValue === 'symbol') {
    return Symbol(originValue.description)
  }

  // 判断是否函数类型,函数类型直接返回,this 是动态绑定的
  if (typeof originValue === 'function') {
    return originValue
  }

  // ...各种类型判断即可,思路一致

  if (!isObject(originValue)) {
    return originValue
  }

  const newObj = Array.isArray(originValue) ? [] : {}

  for (const key in originValue) {
    newObj[key] = deepClone(originValue[key])
  }

  const symbols = Object.getOwnPropertySymbols(originValue)
  for (const s of symbols) {
    newObj[s] = deepClone(originValue[s])
  }

  return newObj
}

function isObject(value) {
  return (
    value !== null && (typeof value === 'object' || typeof value === 'function')
  )
}

// 测试代码
const s1 = Symbol('aaa')
const s2 = Symbol('bbb')

const obj = {
  name: 'why',
  age: 18,
  friend: {
    name: 'james',
    address: {
      city: '广州'
    }
  },
  // 数组类型
  hobbies: ['abc', 'cba', 'nba'],
  // 函数类型
  foo: function (m, n) {
    console.log('foo function')
    console.log('100代码逻辑')
    return 123
  },
  //   Symbol作为key和value
  [s1]: 'abc',
  s2: s2,
  //   Set/Map
  set: new Set(['aaa', 'bbb', 'ccc']),
  map: new Map([
    ['aaa', 'abc'],
    ['bbb', 'cba']
  ])
}

// obj.info = obj

const newObj = deepClone(obj)
console.log(newObj === obj)

obj.friend.name = 'kobe'
obj.friend.address.city = '成都'
console.log(newObj)
// console.log(newObj.s2 === obj.s2)

// console.log(newObj.info.info.info)
