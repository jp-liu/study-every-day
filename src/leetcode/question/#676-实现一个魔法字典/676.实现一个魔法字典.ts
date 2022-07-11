/*
 * @lc app=leetcode.cn id=676 lang=typescript
 *
 * [676] 实现一个魔法字典
 */

// @lc code=start
class MagicDictionary {
  words: string[]
  constructor() {}

  buildDict(dictionary: string[]): void {
    this.words = dictionary
  }

  search(searchWord: string): boolean {
    for (const word of this.words) {
      if (word.length !== searchWord.length) {
        continue
      }

      let diff = 0
      for (let i = 0; i < word.length; ++i) {
        if (word[i] !== searchWord[i]) {
          ++diff
          if (diff > 1) {
            break
          }
        }
      }
      if (diff === 1) {
        return true
      }
    }
    return false
  }
}

/**
 * Your MagicDictionary object will be instantiated and called as such:
 * var obj = new MagicDictionary()
 * obj.buildDict(dictionary)
 * var param_2 = obj.search(searchWord)
 */
// @lc code=end
