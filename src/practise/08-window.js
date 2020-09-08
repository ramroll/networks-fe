const fetch = require('node-fetch')

function hash(args) {
  return args.join(',')
}
function window(f, time = 50) {
  let window = {} 
  let flag = false 
  return (...args) => {
    return new Promise((resolve) => {
      if (!window[hash(args)]) {
        window[hash(args)] = {
          func: f,
          args,
          resolvers: [],
        }
      }
      if (!flag) {
        flag = true
        setTimeout(() => {
          Object.keys(window).forEach((key) => {
            const { func, args, resolvers } = window[key]
            const promise = func(...args)
              .then((resp) => resp.text())
              .then((text) =>
                resolvers.map((r) => {
                  r(text)
                })
              )
          })
          flag = false
        }, time)
      }
      console.log(args)
      window[hash(args)].resolvers.push(resolve)
    })
  }
}

const request = window(fetch, 20)

request('http://www.baidu.com')
  .then(txt => console.log(txt.length))
request('http://www.baidu.com')
  .then(txt => console.log(txt.length))
request('http://www.baidu.com')
  .then(txt => console.log(txt.length))

request('http://www.zhihu.com')
  .then(txt => console.log(txt.length))
request('http://www.baidu.com')
  .then(txt => console.log(txt.length))
request('http://www.baidu.com')
  .then(txt => console.log(txt.length))