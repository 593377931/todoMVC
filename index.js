const express = require('express')
const path = require('path')
var todoServer = express()
todoServer.set('x-powered-by', false)

todoServer.use(express.static(path.join(__dirname, './node_modules')))
todoServer.use(express.static(path.join(__dirname, './static')))
todoServer.get('/', (req, res) => {
  res.sendFile('./static/todoVue.html', {
    root: __dirname
  })
}).listen(3001, console.log(3001))