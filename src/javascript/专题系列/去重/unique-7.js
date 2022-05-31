const test = [2, 1, 1, 3, 4, 2, 3, 4, 3, 3]

function unique(array) {
  const obj = {}
  return array.filter(function (item) {
    // 如果对象拥有属性,则证明已经出现过,没有出现的则设置一下
    return obj.hasOwnProperty(item) ? false : (obj[item] = true)
  })
}

console.log(unique(test)) // [ 2, 1, 3, 4 ]
