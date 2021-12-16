// eslint-disable-next-line no-extend-native
Function.prototype.myBind = function (ctx, ...bindArgs) {
  // 1.必须是函数
  if (typeof this !== 'function') {
    throw TypeError('Bind call should be a function')
  }

  // 2.保存函数
  const self = this

  // 3.创建构造函数
  function Constructor() {}

  // 4.创建返回调用函数
  function myBind(...args) {
    // 4.1 保存原型链,判断是否是`new`调用
    return self.apply(
      this instanceof Constructor ? this : ctx,
      bindArgs.concat(...args)
    )
  }

  // 5.绑定原型
  if (this.prototype) {
    // 使用原函数的原型链
    Constructor.prototype = this.prototype
  }

  // 6.通过将返回函数的原型设置为`Constructor`实例
  // 这样在调用`new`的时候,执行这个函数,原型链是原来那个函数的原型链
  // new myBind() => new Constructor() => this.prototype
  myBind.prototype = new Constructor()

  return myBind
}

const foo = {
  value: 1
}

function bar(name, age, has) {
  console.log(name)
  console.log(age)
  console.log(this.value)
  console.log(this)
  this.has = has
}

const Bar = bar.myBind(foo, 123)

const b = new Bar('ooooooo', 'aaaaaa')
console.log(b.has)
