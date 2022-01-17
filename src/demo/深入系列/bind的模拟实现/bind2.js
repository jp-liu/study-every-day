// 第二版, 要参数
Function.prototype.jpBind = function (context, ...args) {
  // 1.this 异常判断
  context = context ? Object(context) : globalThis

  // 2.获取调用的函数
  const self = this
  return function (...arr) {
    return self.apply(context, arr.concat(args))
  }
}
