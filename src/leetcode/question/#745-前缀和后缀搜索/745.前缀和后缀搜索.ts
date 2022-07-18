/*
 * @lc app=leetcode.cn id=745 lang=typescript
 *
 * [745] 前缀和后缀搜索
 */

// @lc code=start
class WordFilter {
  constructor(public words: string[]) {
    this.words = words
  }

  f(pref: string, suff: string): number {
    for (let i = this.words.length - 1; i >= 0; i--) {
      const item = this.words[i]
      if (item.startsWith(pref) && item.endsWith(suff)) {
        return i
      }
    }
    return -1
  }
}

/**
 * Your WordFilter object will be instantiated and called as such:
 * var obj = new WordFilter(words)
 * var param_1 = obj.f(pref,suff)
 */
// @lc code=end

const w = new WordFilter(['apple'])
w.f('b', 'e')
