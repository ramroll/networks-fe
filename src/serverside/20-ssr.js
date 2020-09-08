const app = require('express')()
const render = require('./lib/render')
const path = require('path')
const html = render({
  name : 'div',
  props : {

    onClick : () => {
      window.alert('123')
    },

  },
  children : [{
    name : 'ul',
    children : [
      {
        name : 'li',
        children : 'Apple'
      },
      {
        name : 'li',
        children : 'Alibaba'
      },
    ]
  }]
}, 'html')

app.get('/page-ssr.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'lib/page-ssr.js'))
})

app.get('/page.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'lib/page.js'))
})


app.get('/', (req, res) => {
  res.send(`<html>
    <body>
    <div id="root">
    </div>
    <script src='/page.js'></script>
  </body>`)
})

app.get('/ssr', (req, res) => {
  res.send(`<html>
    <body>
      <div id="root">
      ${html}
      </div>
    <script src='/page-ssr.js'></script>
  </body>`)
})

app.listen(3000)