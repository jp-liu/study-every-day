/*
 * @lc app=leetcode.cn id=31 lang=typescript
 *
 * [31] 下一个排列
 */

// @lc code=start
/**
 Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums: number[]): void {
  // 下一个排列就是寻找下一个更大的数字,(尽可能小的前进)
  // 1.从右开始寻找第一个升序的 [i, j],交换二者,得到一个更大的数
  // 2.尽可能小,那么交换之后,将 [j, end] 排序,这样就是进一位,数值变大,后面排序则为最小的情况
  const n = nums.length
  if (n === 1) return

  let i = n - 2,
    j = n - 1,
    k = n - 1
  // 123465  交换 4,5
  while (nums[i] >= nums[j]) {
    // 6 > 5 则向前移动
    // 1,1 相等也向前移动,相等交换不存在更大
    i--
    j--
  }

  // 321 则直接重置
  if (i >= 0) {
    // 123465 => 123546
    // 寻找第一个大于 nums[i] 的元素
    while (nums[i] >= nums[k]) {
      k--
    }
    // 交换位置
    ;[nums[i], nums[k]] = [nums[k], nums[i]]
  }
  // 排序末尾
  // 123546 => 123564 => (123654) => 123645
  // reverse A[j:end]
  for (let e = n - 1; e > j; e--) {
    ;[nums[j], nums[e]] = [nums[e], nums[j]]
    j++
  }
}
// @lc code=end
nextPermutation([1, 1])
