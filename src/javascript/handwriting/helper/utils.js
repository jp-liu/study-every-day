/**
 * @description 获取数据准确类型
 */
const toString = value => Object.prototype.toString.call(value)

/**
 * @description 判断属性是否当前对象自身属性
 */
const hasOwn = (obj, key) => Object.prototype.hasOwnProperty(obj, key)
module.exports = {
  toString,
  hasOwn
}
