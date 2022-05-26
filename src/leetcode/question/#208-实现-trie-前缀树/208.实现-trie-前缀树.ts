/*
 * @lc app=leetcode.cn id=208 lang=typescript
 *
 * [208] 实现 Trie (前缀树)
 */

// @lc code=start
class Trie {
  trie: any
  constructor() {
    this.trie = {}
  }

  insert(word: string): void {
    let { trie } = this
    for (const s of word) {
      if (!trie[s]) {
        trie[s] = {}
      }
      trie = trie[s]
    }
    trie.end = true
  }

  search(word: string): boolean {
    const w = this.getWord(word)
    return !!w && !!w.end
  }

  startsWith(prefix: string): boolean {
    const word = this.getWord(prefix)
    return word !== null
  }

  private getWord(word: string) {
    let { trie } = this
    for (const s of word) {
      if (!trie[s]) return null
      trie = trie[s]
    }
    return trie
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end

var trie = new Trie()
// console.log(trie.insert("apple"))
console.log(trie.search('apple')) // 返回 True
// console.log(trie.search("app"))     // 返回 False
// console.log(trie.startsWith("app")) // 返回 True
// console.log(trie.insert("app"))
// console.log(trie.search("app"))     // 返回 True
