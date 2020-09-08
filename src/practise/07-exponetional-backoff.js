const fetch = require('node-fetch')
function request(url){
  let resolved = false
  let t = 1 
  return new Promise((resolve) => {
    function doFetch(){
      if(resolved || t > 16) {
        return
      }
      
      fetch(url).then((resp) => {
        return resp.text()
      })
      .then(data => {
        if(!resolved) {
          resolved = true
          resolve(data)
          console.log('t=', t)
        }
      })
      .catch(ex => {
        console.error(ex)
      })
      setTimeout(() => {
        doFetch()
        t *= 2
      }, t * 100)
    }
    doFetch()
  })
}

request('http://www.baidu.com')
  .then(data => {
    console.log(data.length)
  })

setTimeout(() => {

}, 3000)