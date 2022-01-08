const str = '1000000000000'
const reg = /(?=(\B\d{3})+$)/g
const res = str.replace(reg, ',')
console.log(res)
