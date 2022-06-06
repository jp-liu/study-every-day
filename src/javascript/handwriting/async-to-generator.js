// async await 就是一个自执行的 generator 函数，从这一点出发，就能解决这个问题
function asyncToGenerator(generatorFn) {
  return function (...args) {
    // 执行生成器函数，获取迭代器对象
    const gen = generatorFn.apply(this, args)

    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let genResult
        try {
          // 获取执行迭代结果
          genResult = gen[key](arg)
        } catch (error) {
          reject(error)
        }
        const { value, done } = genResult
        if (done) {
          // 是否结束
          resolve(value)
        } else {
          // 继续执行，包装 value 是避免返回的 value 是一个 promise 对象
          Promise.resolve(value).then(
            v => step('next', v),
            error => step('throw', error)
          )
        }
      }
      // 启动
      step('next')
    })
  }
}

const getData = () =>
  new Promise(resolve => setTimeout(() => resolve('data'), 1000))

var test = asyncToGenerator(function* testG() {
  // await被编译成了yield
  const data = yield getData()
  console.log('data: ', data)
  const data2 = yield getData()
  console.log('data2: ', data2)
  return 'success'
})

test().then(res => console.log(res))
