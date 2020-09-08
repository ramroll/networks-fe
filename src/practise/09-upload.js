const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const { urlencoded } = require('express')
const app = express()

app.get('/submit', (req, res) => {
  res.sendFile(path.resolve(__dirname, "submit.html"))
})

app.get('/base64', (req, res) => {
  res.sendFile(path.resolve(__dirname, "submitb64.html"))
})
app.get('/binary', (req, res) => {
  res.sendFile(path.resolve(__dirname, "submitbinary.html"))
})



app.post(
  "/submitbinary",
  fileUpload(),
  (req, res) => {
    console.log(req.files, req.body)
    req.files.file.mv(path.resolve(__dirname, 'upload/b.jpg'))
    res.send("ok")
  }
)

app.post(
  "/submit",
  fileUpload(),
  (req, res) => {
    console.log(req.files, req.body)
    req.files.file.mv(path.resolve(__dirname, 'upload/a.jpg'))
    res.send("ok")
  }
)

app.post(
  "/submitb64",
  bodyParser.json(),
  (req, res) => {

    const buffer = new Buffer(req.body.data, 'base64')
    console.log(req.body.data.length)
    fs.writeFileSync(
      path.resolve(__dirname, "upload/x.jpg"), 
      buffer)

    res.send("ok")
  }
)



app.listen(3000)
