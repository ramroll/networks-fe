const express = require('express')
const app = express() 
const path = require('path')

app.use(express.static(path.resolve(__dirname, 'lib')))

app.get('/', (req, res) => {
  res.send(`
  <html>
    <body>
    <script src='/require.js' ></script>
    <script>
      require.path = '/'
      require(['add', 'mult'], (add, mult) => {
        console.log(add(3, 5))
        console.log(mult(3, 5))
      })
    </script>
    </body>
  </html>
  `)
})

app.listen(3000)