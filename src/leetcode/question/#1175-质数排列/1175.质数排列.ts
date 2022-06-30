/*
 * @lc app=leetcode.cn id=1175 lang=typescript
 *
 * [1175] 质数排列
 */

// @lc code=start
const MOD = 1000000007
function numPrimeArrangements(n: number) {
  let numPrimes = 0
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) {
      numPrimes++
    }
  }
  let res = 1
  let m = n - numPrimes
  while (numPrimes > 0) {
    res = res % MOD
    res *= numPrimes
    numPrimes--
  }
  while (m > 0) {
    res = res % MOD
    res *= m
    m--
  }
  return res
}

const isPrime = n => {
  if (n === 1) {
    return false
  }
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}
// @lc code=end
