function create(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}

const a = {
  a: 123,
  b: '321'
}
const b = create(a)
console.log(b.a)
