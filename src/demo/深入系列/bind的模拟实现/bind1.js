// 第一版, 不需要参数
Function.prototype.jpBind = function (context) {
  // 1.this 异常判断
  context = context ? Object(context) : globalThis

  // 2.获取调用的函数
  const self = this
  return function () {
    return self.apply(context)
  }
}
