const PENDING = 1
const FULLFILLED = 2
const REJECTED = 3



class Promise{

  constructor(executor){
    this.state = PENDING

    const resolver = (value) => {
      if(this.state === PENDING) {
        this.state = FULLFILLED 
        this.value = value 
      }

      for(let [onFullFill, resolve] of this.fullfills) {
        const x = onFullFill(this.value)
        resolve(x)
      }
    }
    const rejector = () => {
      this.state = REJECTED
    }

    this.fullfills = []
    executor(resolver, rejector)
  }

  then(onFullfill) {
    return new Promise((resolve, rejector) => {
      switch(this.state) {
        case FULLFILLED:
          const x = onFullfill(this.value)
          resolve(x)
          break
        case PENDING:
          this.fullfills.push([onFullfill, resolve])
          break
      }
    })
  }
}

new Promise((resolve) => {
  setTimeout(() => {
    resolve('123')
  })
}).then(data => {
  console.log(data)
  return '456' 
}).then(data => {
  console.log(data)
  return data
})