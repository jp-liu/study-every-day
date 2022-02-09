/**
 * @description 模拟实现`new`关键字
 * @param {Function} Constructor 构造函数
 * @param  {...any} params 实例参数
 */
function objectFactory(Constructor, ...params) {
  // 1.创建一个空对象
  const obj = new Object()

  // 2.将对象的原型指向构造函数的原型
  obj.__proto__ = Constructor.prototype

  // 3.4.绑定`this`并且执行后续逻辑,添加属性和方法
  Constructor.apply(obj, params)

  // 5.返回实例
  return obj
}

function Person(name) {
  this.name = name
}

const person = objectFactory(Person, '娃哈哈')
console.log(person)
