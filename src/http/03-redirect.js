const express = require('express')
const app = express()

app.get('/301', (req, res) => {
  res.redirect(301, '/def')
})
app.get('/302', (req, res) => {
  res.redirect(302, '/def')
})
app.get('/303', (req, res) => {
  res.redirect(303, '/def')
})

app.post('/307', (req, res) => {
  res.redirect(307, '/def')
})


app.get('/def', (req, res) => {
  res.send("THis is def(GET)")
})

app.post('/def', (req, res) => {
  res.send("THis is def(POST)")
})



app.listen(3000, ()=>{})