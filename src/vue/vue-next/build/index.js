async function runParallel(maxConcurrency, source, iteratorFn) {
  // 1.总任务集合
  const ret = []
  // 2.正在执行的任务集合
  const executing = []
  for (const item of source) {
    console.log('item:', item)
    // 3.创建微任务,加入总任务集合
    const p = Promise.resolve().then(() => iteratorFn(item, source))
    ret.push(p)

    // 4.判断最大可并行数,默认核心数可并行,也就是看cpu有几个核心,可以同时处理几个任务
    if (maxConcurrency <= source.length) {
      // 5.创建执行微任务,加入模拟执行栈,执行完毕后删除,方便后续任务加入
      // 需要注意的是, e 是本身,删除返回本身是个promise,而且是个
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= maxConcurrency) {
        // 6.等待一个任务完结,完结后进行下一批次任务
        // 在这里任务上一批次的任务,已经全部在执行中了,不影响效率,后续加入的也会加入被 `race` 调用,加入队列
        await Promise.race(executing)
      }
    }
  }
  // 7.分批次任务已经全部进入执行状态,当剩余任务小于并行数时,直接交由 `all` 统一执行,
  return Promise.all(ret)
}
// async function runParallel(maxConcurrency, source, iteratorFn) {
//   const ret = []
//   const executing = []
//   for (const item of source) {
//     console.log('item:', item)
//     // 1.创建微任务工作
//     const p = Promise.resolve().then(() => {
//       const r = iteratorFn(item, source)
//       return r
//     })
//     // 2.存入微任务队列组
//     ret.push(p)

//     // 3.如果最大并行数,小于任务数量,则分批执行,一次执行最大并行方案
//     if (maxConcurrency <= source.length) {
//       // 3.1 获取 p 的返回结果 promise
//       const e = p.then((res) => {
//         // 执行完毕,删除掉
//         const r = executing.splice(executing.indexOf(e), 1)
//         console.log(e);
//         console.log('r', r)
//       })

//       // 3.2 加入执行任务组
//       executing.push(e)

//       // 3.3 如果任务组>=最大核心数了,则等待任务执行完毕,才开始下一批
//       if (executing.length >= maxConcurrency) {
//         console.log('开始等待任务完成')
//         // 等待其中一个完成,完成一个,则下一步,这个时候
//         // 上一批所有的 p,已经进入执行状态,executing中终结了一个任务,下次迭代可以进来一个新的任务
//         // 保证,同时执行的数量为 maxConcurrency 个
//         await Promise.race(executing)

//         console.log('任务完成')
//       }
//     }
//   }
//   console.log('end ->', ret)
//   return Promise.all(ret)
// }

const maxConcurrency = 5
const source = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
function iteratorFn(item, source) {
  return new Promise((resolve, reject) => {
    console.log('iteratorFn item ->', item)
    console.log('iteratorFn source ->', source)
    setTimeout(() => {
      resolve('1111')
    }, 0)
  })
}

runParallel(maxConcurrency, source, iteratorFn)
