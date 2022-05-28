const limit = require('./index.js')

function sleep(time, name = 'test') {
  console.log(name + '开始')
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(name + '结束----')
      resolve({ time, name })
    }, time * 1000)
  })
}

async function test() {
  const runner = limit(1)

  const tasks = [
    () => sleep(1, '吃饭'),
    () => sleep(3, '睡觉'),
    () => sleep(4, '打游戏'),
    () => sleep(3, '学习算法'),
    () => sleep(3, '学习Vue和React')
  ].map(runner)

  const result = await Promise.all(tasks)
  console.log(result)
}

test()
