/*
 * @lc app=leetcode.cn id=749 lang=typescript
 *
 * [749] 隔离病毒
 */

// @lc code=start
const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1]
]
function containVirus(isInfected: number[][]): number {
  const m = isInfected.length,
    n = isInfected[0].length
  let ans = 0
  while (true) {
    const neighbors = []
    const firewalls = []
    for (let i = 0; i < m; ++i) {
      for (let j = 0; j < n; ++j) {
        if (isInfected[i][j] === 1) {
          const queue: number[][] = []
          queue.push([i, j])
          const neighbor = new Set<number>()
          let firewall = 0,
            idx = neighbors.length + 1
          isInfected[i][j] = -idx

          while (queue.length > 0) {
            const arr = queue.shift()
            let x = arr[0],
              y = arr[1]
            for (let d = 0; d < 4; ++d) {
              let nx = x + dirs[d][0],
                ny = y + dirs[d][1]
              if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
                if (isInfected[nx][ny] === 1) {
                  queue.push([nx, ny])
                  isInfected[nx][ny] = -idx
                } else if (isInfected[nx][ny] === 0) {
                  ++firewall
                  neighbor.add(getHash(nx, ny))
                }
              }
            }
          }
          neighbors.push(neighbor)
          firewalls.push(firewall)
        }
      }
    }

    if (neighbors.length === 0) {
      break
    }

    let idx = 0
    for (let i = 1; i < neighbors.length; ++i) {
      if (neighbors[i].size > neighbors[idx].size) {
        idx = i
      }
    }
    ans += firewalls[idx]
    for (let i = 0; i < m; ++i) {
      for (let j = 0; j < n; ++j) {
        if (isInfected[i][j] < 0) {
          if (isInfected[i][j] !== -idx - 1) {
            isInfected[i][j] = 1
          } else {
            isInfected[i][j] = 2
          }
        }
      }
    }
    for (let i = 0; i < neighbors.length; ++i) {
      if (i !== idx) {
        for (const val of neighbors[i]) {
          let x = val >> 16,
            y = val & ((1 << 16) - 1)
          isInfected[x][y] = 1
        }
      }
    }
    if (neighbors.length === 1) {
      break
    }
  }
  return ans
}
const getHash = (x: number, y: number) => {
  return (x << 16) ^ y
}
// @lc code=end
