function memory(f, maxSize = 10) {

  // [{hash, value}]
  const cache = []

  return (...args) => {
    const hash = args.join(',')

    const item = cache.find(x => x.hash === hash)
    if(item) {
      return item.value
    }

    const result = f(...args)
    cache.push({
      hash,
      value: result
    })

    if(cache.length > maxSize) {
      cache.shift()
    }
    return result
  }

}

// 1 1 2 3 5 8 13
function fib(n) {
  if(n === 1 || n === 2) {
    return 1
  }
  return mfib(n-1) + mfib(n-2)
}
const mfib = memory(fib, 10)
console.log(fib(40))