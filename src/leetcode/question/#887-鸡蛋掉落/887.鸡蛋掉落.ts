/*
 * @lc app=leetcode.cn id=887 lang=typescript
 *
 * [887] 鸡蛋掉落
 */

// @lc code=start
function superEggDrop(k: number, n: number): number {
  // https://leetcode.cn/problems/super-egg-drop/solution/887-by-ikaruga/
  // 递推状态: dp[i][ans] = n 使用 i 个鸡蛋,尝试ans次可以得到的楼高
  // 递推公式: dp[i][ans-1]     鸡蛋没碎,尝试次数减一,则下次可以在这个基础上在确定起丢点
  // 递推公式: dp[i - 1][ans-1] 鸡蛋碎了,尝试次数减一, 可以确定在哪一层扔会碎,上面楼层就不用丢了
  const dp = new Array(k + 1).fill(0).map(() => new Array(n + 1).fill(0))
  let ans = 0
  while (dp[k][ans] < n) {
    ans++
    for (let i = 1; i <= k; i++) {
      // 在没碎可以确定的楼层上在进行确认,所以是相加,+1是测试了当前楼层
      dp[i][ans] = dp[i][ans - 1] + dp[i - 1][ans - 1] + 1
    }
  }
  return ans
  // let ans = 1
  // while (dfs(k, ans) < n + 1) {
  //   ans++
  // }
  // return ans

  // function dfs(k: number, ans: number): number {
  //   // 如果只有一次机会,从当前楼扔啊,就只能确定 1+f 层楼高
  //   // 一个蛋一次只能逐层一个一个丢,所以一次只能确定 1+f 层楼高
  //   if (ans === 1 || k === 1) return ans + 1
  //   return dfs(k, ans - 1) + dfs(k - 1, ans - 1)
  // }
}
// @lc code=end
