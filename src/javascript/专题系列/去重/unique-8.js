const test = [1, 2, 1, 1, '1']

function unique(array) {
  return Array.from(new Set(array))
}

console.log(unique(test)) // [1, 2, "1"]
