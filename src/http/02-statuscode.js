const express = require('express')
const app = express()

app.get('/greetings', (req, response) => {
  response.send('Hi!')
})

app.post('/product', (req, res) => {

  const contentType = req.headers['content-type']
   console.log(contentType)

  let requestText = ""
  let body = null 
  req.on('data', (buffer) => {
    // 8bit - byte
    requestText += buffer.toString('utf-8')
    // console.log(buffer.toString('utf-8').length)
  })

  req.on('end', () => {
    switch (contentType) {
      case "application/json":
        body = JSON.parse(requestText);
        console.log(body)
        res.set('content-type', 'application/json')
        res.status(201).send(JSON.stringify({success : 1}))
        break;
    }
  })

})

app.delete('/product/:id', (req, res) => {
  console.log(req.params.id)
  res.sendStatus(204)
})

app.listen(3000, () => {})