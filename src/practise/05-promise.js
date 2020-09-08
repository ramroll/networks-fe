// example 01
const promise = new Promise((resolve, reject) => {
  resolve(100)
}).then(data => {
  console.log(data)
})

const { response } = require("express")

// example 02
const promise = new Promise((resolve, reject) => {
  resolve(100)
}).then(data => {
  console.log(data)
  return 'abc'
})
.then(data => {
  console.log(data)
})

// example 03
function wait(ms = 1000, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, ms)
  })
}
const promise = new Promise((resolve, reject) => {
  resolve(100)
}).then(data => {
  console.log(data)
  return wait(1000, 'abc')
})
.then(data => {
  console.log(data)
  console.log('here--')
})

// example04

const promise = new Promise((resolve, reject) => {
  reject("some error")
}).then(data => {
  console.log("1", data)
}).catch(ex => {
  console.error(ex)
  return "GO"
}).then(data => {
  console.log(data)
})


// example05

function wait(ms = 1000, data){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, ms)
  })

}



async function foo(){
  console.log('--begin--')
  const one = await wait(1000, 1)
  console.log('--tick 1--')
  const two = await wait(1000, 2)
  console.log('--tick 2--')
  console.log(one, two)

  await Promise.reject('some error')
  try{
    await Promise.reject('some error')
  } catch(ex) {
    console.log(ex)
  }
}
foo()


// example 6
function wait(ms = 1000, data){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, ms)
  })

}
Promise.all([wait(200, 1), wait(100, 2)])
  .then(data => {
    console.log('all', data)
  })

Promise.race([wait(200, 1), wait(100, 2)])
  .then(data => {
    console.log('race', data)
  })



