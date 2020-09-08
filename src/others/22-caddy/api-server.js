const express = require('express')

const app1 = express()
const app2 = express()

app1.get('/', (req, res) =>{
  res.send("app1")
})

app2.get('/', (req, res) => {
  res.send("app2")
})

app1.listen(3000)
app2.listen(3001)
