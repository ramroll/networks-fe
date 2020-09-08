function memory(f, maxSize = 10) {

  // [{hash, value}]
  let cache = []
  //let cache = {}

  return (...args) => {
    const hash = args.join(',')

    const item = cache.find(x => x.hash === hash)
    if(item) {
      item.time = new Date().getTime()
      return item.value
    }

    const result = f(...args)
    cache.push({
      hash,
      value: result,
      time: new Date().getTime()
    })

    if(cache.length > maxSize) {
      let min = Infinity
      let minItem = null
      for(let item of cache) {
        if(item.time <min) {
          min = item.time
          minItem = item
        }
      }
      cache = cache.filter(x => x !== minItem)
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