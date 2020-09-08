const express = require('express')

const app1 = express()
app1.get('/', (req, res) => {
  res.send("hello")
})

app1.listen(3000)

const app2 = express()

app2.options('/api', (req, res) => {
  res.set('Access-Control-Allow-Origin' , "*")
  res.set('Access-Control-Allow-Headers', "content-type,token")
  res.set('Access-Control-Allow-Methods', "PUT")
  res.sendStatus(200)
})

app2.get('/api', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.send('go-to')
})

app2.post('/api', (req, res) => {
  // res.set('Access-Control-Allow-Origin', 'http://www.dev.com')
  res.send('go-to')
})

app2.put('/api', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://www.dev.com')
  res.send('go')
})



app2.listen(3001)