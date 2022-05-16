function flat(origin, depth = 1) {
  if (!Array.isArray(origin) || depth === 0) {
    return origin
  }
  return origin.reduce((prev, next) => {
    return prev.concat(flat(next, depth - 1))
  }, [])
}

console.log(flat([1, 2, [3, 4, [5]]]))
