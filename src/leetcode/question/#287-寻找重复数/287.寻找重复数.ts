/*
 * @lc app=leetcode.cn id=287 lang=typescript
 *
 * [287] 寻找重复数
 */

// @lc code=start
// 142 环形链表
function findDuplicate(nums: number[]): number {
  // 寻找重复数，数组是1-n，也就不可能会越界，元素可以作为下标进行索引
  let slow = nums[0]
  let fast = nums[nums[0]]

  // 1.要么都走到终点，也就是，n
  // 2.要么成环成为一个点
  while (slow !== fast) {
    slow = nums[slow]
    fast = nums[nums[fast]]
  }

  // 重合的时候，快指针跑了 2倍慢指针+ （环-1倍满指针）
  // 这个时候，慢指针重头跑，快指针也放慢速度，二者再次相遇的时候，就是成环点
  slow = 0
  while (slow !== fast) {
    fast = nums[fast]
    slow = nums[slow]
  }

  return slow
}
// @lc code=end
findDuplicate([1, 3, 4, 2, 2])

function findDuplicate1(nums: number[]): number {
  // 二分查找的关键在于递增性质，这里的递增属性是
  // 当前 nums[i] 出现的次数，一个数出现次数：
  //  - 重复之前：出现次数就是，也就是上一个数出现的次数 + 1，也会满足 次数 <= nums[i],
  //  - 重复之后：当一个数重复之后，出现次数就会大于当前 nums[i],重复一次，num[i] + 1
  // 例如：
  //  - [1,   2,    3,     3,      4,     5]
  //     1  (1+1)  (2+1)  (3+1)   (4+1)  (5+1)
  //     1    2         4          5      6      出现次数,从 3 开始，比当前 i 大了
  let n = nums.length, // 数组范围
    left = 1, // 题目范围
    right = n - 1, // 题目范围
    ans // 结果

  while (left <= right) {
    const mid = (left + right) >> 1
    let cnt = 0
    for (let i = 0; i < n; i++) {
      cnt += +(nums[i] <= mid) // 计算出现次数
    }
    if (cnt <= mid) {
      // 满足条件，则没重复
      left = mid + 1
    } else {
      // 不满足，则说明开始重复了
      ans = mid
      right = mid - 1
    }
  }
  return ans
}
