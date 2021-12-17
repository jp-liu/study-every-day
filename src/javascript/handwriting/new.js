/**
 * @description 实现一个手动`new`
 * @summary `new`做的事情包括
 *          1.创建一个空对象
 *          2.将`this`指向当前空对象
 *          3.执行构造函数,向`this`挂在属性
 *          4.返回当前对象
 * @tips 1.通过创建一个空对象
 */
function objectfactory() {
  // 1.创建一个空对象
  // eslint-disable-next-line no-new-object
  const obj = new Object()

  // 2.获取构造函数本身
  const Constructor = [].shift.call(arguments)

  // 3.绑定原型
  // obj.__proto__ ==> Object.prototype
  // obj.__proto__ ==> Constructor.prototype
  // eslint-disable-next-line no-proto
  obj.__proto__ = Constructor.prototype

  // 4.通过`apply`给`obj`挂载属性,
  // 判断是构造函数返回值,是否是对象
  // 是对象则需要返回对象,而不是实例
  const result = Constructor.apply(obj, arguments)

  return typeof result === 'object' ? result : obj
}

// Otaku 御宅族，简称宅
function Otaku(name, age) {
  this.name = name
  this.age = age

  this.habit = 'Games'
}

// 因为缺乏锻炼的缘故，身体强度让人担忧
Otaku.prototype.strength = 60

Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name)
}

const person = new Otaku('Kevin', '18')

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName() // I am Kevin
console.log('--------------------------------')
const person1 = objectfactory(Otaku, 'Kevin', '18')

console.log(person1.name) // Kevin
console.log(person1.habit) // Games
console.log(person1.strength) // 60

person1.sayYourName() // I am Kevin

// Otaku 御宅族，简称宅
function Otaku1(name, age) {
  this.job = '厨师'
  this.age = age

  return {
    name: name,
    habit: 'Games'
  }
}

console.log('--------------------------------')
const person2 = objectfactory(Otaku1, 'Kevin', '18')
console.log(person2.job) // undefined
console.log(person2.name) // Kevin
console.log(person2.habit) // Games
console.log(person2.job) // undefined
