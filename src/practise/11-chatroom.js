const express = require('express')
const app = express()
const path = require('path')
app.use(express.static('static'))
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "chatroom.html"))
})
app.listen(3000)

const io = require('socket.io')(8080)

const users = new Map() 

function broadcast(type, message, sender) {
  for(let socket of users.keys()) {
    socket.send({type, message, sender})
  }
}

io.on('connect', socket => {
  socket.on('message', data => {
    console.log('here123123123', data)
    switch(data.type) {
      case 'LOGIN':
        users.set(socket, {name : data.name})
        broadcast('LOGIN', `${data.name}加入了聊天`)
        break
      case 'CHAT':
        const user = users.get(socket)
        broadcast('CHAT', data.message, user.name)
        break
    }
  })
})