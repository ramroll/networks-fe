const express = require('express')

const app = express()

app.get('/bbc', (req, res) => {
  res.sendStatus(502)
})

app.listen(3000, () => {
})