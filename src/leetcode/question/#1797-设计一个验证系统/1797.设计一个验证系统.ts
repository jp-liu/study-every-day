/*
 * @lc app=leetcode.cn id=1797 lang=typescript
 *
 * [1797] 设计一个验证系统
 */

// @lc code=start
class AuthenticationManager {
  timeToLive: number
  tokenMap: Map<string, number>
  constructor(timeToLive: number) {
    this.timeToLive = timeToLive
    this.tokenMap = new Map()
  }

  generate(tokenId: string, currentTime: number): void {
    this.tokenMap.set(tokenId, currentTime)
  }

  renew(tokenId: string, currentTime: number): void {
    if (this.tokenMap.has(tokenId)) {
      const time = this.tokenMap.get(tokenId)
      if (time + this.timeToLive > currentTime) {
        this.tokenMap.set(tokenId, currentTime)
      }
    }
  }

  countUnexpiredTokens(currentTime: number): number {
    let result = 0
    for (const time of this.tokenMap.values()) {
      if (time + this.timeToLive > currentTime) {
        result += 1
      }
    }
    return result
  }
}

/**
 * Your AuthenticationManager object will be instantiated and called as such:
 * var obj = new AuthenticationManager(timeToLive)
 * obj.generate(tokenId,currentTime)
 * obj.renew(tokenId,currentTime)
 * var param_3 = obj.countUnexpiredTokens(currentTime)
 */
// @lc code=end
