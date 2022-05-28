function limit(maxLimit) {
  const queue = [] // 任务执行队列
  let activeTask = 0

  const next = () => {
    activeTask--
    if (queue.length) {
      queue.shift()()
    }
  }

  const run = async (fn, args, resolve) => {
    activeTask++
    const result = await fn(...args)
    resolve(result)
    next()
  }

  const push = (fn, args, resolve) => {
    queue.push(run.bind(null, fn, args, resolve))
    // 如果任务队列未满则直接执行,满了则等待执行
    if (activeTask < maxLimit) {
      queue.shift()()
    }
  }

  return function runner(fn, ...args) {
    return new Promise((resolve, reject) => {
      try {
        push(fn, args, resolve)
      } catch (error) {
        reject(error)
      }
    })
  }
}

module.exports = limit
