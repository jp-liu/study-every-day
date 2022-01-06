function createObject(Con, ...args) {
  // 创建新对象obj
  // var obj = {};也可以
  const obj = Object.create(null)

  // 将obj.__proto__ -> 构造函数原型
  // (不推荐)obj.__proto__ = Con.prototype
  Object.setPrototypeOf(obj, Con.prototype)

  // 执行构造函数，并接受构造函数返回值
  const ret = Con.apply(obj, args)

  // 若构造函数返回值为对象，直接返回该对象
  // 否则返回obj
  return typeof ret === 'object' ? ret : obj
}

function Person(name) {
  this.name = name
}

const p1 = createObject(Person, '娃哈哈')
console.log(p1)
