/**
 * @description Object.create
 */
function newCreate(proto, propertiesObject) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw TypeError('Object prototype may only be an Object: ' + proto)
  }

  // 原型继承
  function F() {}
  F.prototype = proto
  const o = new F()

  // 扩展属性描述符
  if (propertiesObject !== undefined) {
    Object.keys(propertiesObject).forEach(prop => {
      const desc = propertiesObject[prop]
      if (typeof desc !== 'object' || desc === null) {
        throw TypeError('Object prorotype may only be an Object: ' + desc)
      } else {
        Object.defineProperty(o, prop, desc)
      }
    })
  }

  return o
}

function Person() {
  this.name = 'wahaha'
}

const con = new Person()
const a = newCreate(con, {
  ccc: {
    get() {
      return con.ccc
    },
    set(newVal) {
      con.ccc = newVal
    }
  }
})
console.log(a.name)
a.ccc = 1
console.log(a.ccc)
// eslint-disable-next-line no-proto
console.log(a.__proto__.constructor === Person)
