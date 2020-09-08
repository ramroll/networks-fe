const express = require('express')

const app = express()
const path = require('path')
const parseHeader = require('parse-headers')
const crypto = require('crypto')

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'handshake.html'))
})

app.listen(3000)

/* -- websocket server -- */
const net = require('net')


const server = net.createServer()

server.on('connection', socket => {

  socket.on('data', (buffer) => {
    const str = buffer.toString()
    console.log('---message ---')
    console.log(str)
    const headers = parseHeader(str)

    const sha1 = crypto.createHash('sha1')
    sha1.update(headers['sec-websocket-key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
    const acceptKey = sha1.digest('base64')

    const response = `HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-Websocket-Accept: ${acceptKey}


    `

    socket.write(response)

  })

})

server.listen(8080)
