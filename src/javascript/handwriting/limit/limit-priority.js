const Heap = require('../Heap.js')

function limitAndPriority(maxLimit) {
  const DEFAULT_PRIORITY = 0
  // 任务执行队列: 采用最大堆实现优先队列,任务优先级
  const queue = new Heap((a, b) => a[0] > b[0])
  let activeTask = 0

  const next = () => {
    activeTask--
    if (queue.size) {
      const top = queue.pop()
      top[1]()
    }
  }

  const run = async (fn, args, resolve) => {
    activeTask++
    const result = await fn(...args)
    resolve(result)
    next()
  }

  const push = (fn, priority, args, resolve) => {
    const job = run.bind(null, fn, args, resolve)
    priority ? queue.push([priority, job]) : queue.push([DEFAULT_PRIORITY, job])
    // 如果任务队列未满则直接执行,满了则等待执行
    if (activeTask < maxLimit) {
      const top = queue.pop()
      top[1]()
    }
  }

  return function runner(fn, priority, ...args) {
    return new Promise((resolve, reject) => {
      try {
        push(fn, priority, args, resolve)
      } catch (error) {
        reject(error)
      }
    })
  }
}

module.exports = limitAndPriority
