// 第三版
// function curry(fn, args, holes) {
//   length = fn.length

//   args = args || []

//   holes = holes || []

//   return function () {
//     var _args = args.slice(0) // 之前传递参数
//     var _holes = holes.slice(0) // 之前占位符信息
//     var argsLen = args.length // 之前传参数量
//     var holesLen = holes.length // 占位符数量
//     var arg
//     var i
//     var index = 0 // 占位符所在下标

//     for (i = 0; i < arguments.length; i++) {
//       arg = arguments[i]
//       // 处理类似 fn(1, _, _, 4)(_, 3) 这种情况，index 需要指向 holes 正确的下标
//       // fn(_, 2)(_, 3) 重复的 _ 处理一个 +1
//       if (arg === _ && holesLen) {
//         index++
//         // fn(_, 2)(_, _, 4)
//         if (index > holesLen) {
//           _args.push(arg)
//           _holes.push(argsLen - 1 + index - holesLen)
//         }
//       }
//       // 处理类似 fn(1)(_) 这种情况
//       // 处理类似 fn(1, _) 这种情况
//       else if (arg === _) {
//         _args.push(arg)
//         _holes.push(argsLen + i)
//       }
//       // 处理类似 fn(_, 2)(1) 这种情况
//       else if (holesLen) {
//         // fn(_, 2)(_, 3)
//         if (index >= holesLen) {
//           _args.push(arg)
//         }
//         // fn(_, 2)(1) 用参数 1 替换占位符
//         else {
//           _args.splice(_holes[index], 1, arg)
//           _holes.splice(index, 1)
//         }
//       } else {
//         _args.push(arg)
//       }
//     }
//     if (_holes.length || _args.length < length) {
//       return curry.call(this, fn, _args, _holes)
//     } else {
//       return fn.apply(this, _args)
//     }
//   }
// }

var _ = {}

// var fn = curry(function(a, b, c, d, e) {
//   console.log([a, b, c, d, e])
// })

// 验证 输出全部都是 [1, 2, 3, 4, 5]
// fn(1, 2, 3, 4, 5)
// fn(_, 2, 3, 4, 5)(1)
// fn(1, _, 3, 4, 5)(2)
// fn(1, _, 3)(_, 4)(2)(5)
// fn(1, _, _, 4)(_, 3)(2)(5)
// fn(_, 2)(_, _, 4)(1)(3)(5)

function currying(fn, args = [], holes = []) {
  const length = fn.length

  return function (...rest) {
    // 1.记录上一次使用的参数和占位符信息
    const _args = args.slice()
    const _holes = holes.slice()
    const argLen = _args.length
    const holeLen = holes.length
    let index = 0 // 记录当前在处理哪一个占位符

    for (let i = 0; i < rest.length; i++) {
      const arg = rest[i]

      // fn(1, _, 3)(_, 4)
      if (arg === _ && holeLen) {
        index++
        // fn1(_, 2)(_, _, 4)(1)(3)(5) 后续占位符数量大于之前的时候
        if (index > holeLen) {
          _args.push(arg)
          // index - holeLen 多出来的占位符数量
          // argLen - 1 长度-1,确定下标
          // 两者相加,就是 `已经传参的数量 + 多出来的占位符` => 当前多出来的占位符所处的下标
          _holes.push(index - holeLen + (argLen - 1))
        }
      } else if (arg === _) {
        // fn1(1)(_, 3)
        _args.push(arg)
        _holes.push(argLen + i)
      } else if (holeLen) {
        // fn1(1, _, 3)(_, 4)
        // 相等则向后加
        if (index >= holeLen) {
          _args.push(arg)
        } else {
          _args.splice(_holes[index], 1, arg)
          _holes.splice(index, 1)
        }
      } else {
        _args.push(arg)
      }
    }

    if (_holes.length || length > _args.length) {
      return currying.call(this, fn, _args, _holes)
    } else {
      return fn.apply(this, _args)
    }
  }
}
var fn1 = currying(function (a, b, c, d, e) {
  console.log([a, b, c, d, e])
})

// 验证 输出全部都是 [1, 2, 3, 4, 5]
fn1(1, 2, 3, 4, 5)
fn1(_, 2, 3, 4, 5)(1)
fn1(1, _, 3, 4, 5)(2)
fn1(1, _, 3)(_, 4)(2)(5)
fn1(1, _, _, 4)(_, 3)(2)(5)
fn1(_, 2)(_, _, 4)(1)(3)(5)

/**
 * @description 柯里化函数
 * @param { Function } fn 被柯里化的函数
 * @param { any[] } args 预置参数
 * @param { number[] } holes 占位符信息
 */
function currying1(fn, args = [], holes = []) {
  const length = fn.length

  return function (...rest) {
    // 1.准备上一调用的参数消息
    const _args = args.slice() // 上一次的参数
    const _holes = holes.slice() // 上一次的占位符信息
    const argLen = _args.length // 参数长度
    const holeLen = _holes.length // 占位符长度
    let index = 0

    // 2.填充参数
    for (let i = 0; i < rest.length; i++) {
      const arg = rest[i]

      // fn2(1, _, 3)(_, 4)
      // (_, 4) 依旧是补充占位符,不处理,向后移位
      if (arg === _ && holeLen) {
        index++

        // fn2(_, 2)(_, _, 4)
        if (index > holeLen) {
          _args.push(arg)
          // (_, 2)(_, _, 4) index-holeLen = 去除之前的占位符信息
          _holes.push(index - holeLen + argLen - 1)
        }
      } else if (arg === _) {
        _args.push(arg)
        _holes.push(argLen + i)
      } else if (holeLen) {
        // fn2(1, _, 3)(_, 4)
        if (index >= holeLen) {
          _args.push(arg)
        } else {
          _args.splice(_holes[index], 1, arg)
          _holes.splice(index, 1)
        }
      } else {
        _args.push(arg)
      }
    }

    // 3.根据参数数量决定调用函数
    if (_holes.length || length > _args.length) {
      return currying1.call(this, fn, _args, _holes)
    } else {
      return fn.apply(this, _args)
    }
  }
}

var fn2 = currying1(function (a, b, c, d, e) {
  console.log([a, b, c, d, e])
})

// fn2(1, 2, 3, 4, 5)
// fn2(_, 2, 3, 4, 5)(1)
// fn2(1, _, 3, 4, 5)(2)
// fn2(1, _, 3)(_, 4)(2)(5)
// fn2(1, _, _, 4)(_, 3)(2)(5)
fn2(_, 2)(_, _, 4)(1)(3)(5)
