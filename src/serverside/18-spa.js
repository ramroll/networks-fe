const app = require('express')()
const path = require('path')
const { reset } = require('nodemon')

const htmlFile = path.resolve(__dirname, "pages/spa.html")
// /proucts /product/123 -> 
app.get(/\/product(s|\/\d+)/, (req, res) => {
  res.sendFile(htmlFile)
})
app.listen(3000)