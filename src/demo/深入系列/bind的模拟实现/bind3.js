// 第三版, 判断 new 调用情况
Function.prototype.jpBind = function (context, ...args) {
  // 1.this 异常判断
  context = context ? Object(context) : globalThis

  // 2.获取调用的函数
  const self = this

  function bindCtr(...arr) {
    // 判断是否 new 调用,如果是创建实例
    // 则 this 会指向通过构造函数创建的对象
    return self.apply(this instanceof bindCtr ? this : context, [
      ...args,
      ...arr
    ])
  }

  // 3.保持原有原型链不变,避免变更
  bindCtr.prototype = this.prototype

  return bindCtr
}
