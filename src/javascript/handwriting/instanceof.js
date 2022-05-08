/**
 * @description 验证是不是一个构造函数的实例
 * @param { object } sub
 * @param { Function } parent
 */
function myInstanceof(sub, parent) {
  let proto = Object.getPrototypeOf(sub)
  const prototype = parent.prototype
  while (proto) {
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

const a = []
const flag = myInstanceof(a, Object)
console.log(flag)
