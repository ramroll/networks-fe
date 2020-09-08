const express = require('express')

const app = express()

app.get('/x', (req, res) => {
  res.send("x6")
})

app.listen(3000)