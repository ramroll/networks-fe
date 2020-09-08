const app = require('express')()

const fs = require('fs')
const path = require('path')

const pageDir = path.resolve(__dirname, "pages")

const htmls = fs.readdirSync(pageDir)

function displayHtmlFile(name) {
  return (req, res) => {
    const filePath = path.resolve(pageDir, name + ".html")
    res.sendFile(filePath)
  }
}
htmls.forEach(file => {
  const [name, ext] = file.split('.')
  app.get('/' + name, displayHtmlFile(name))
})

app.listen(3000)