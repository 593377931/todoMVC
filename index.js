const express = require('express')
const path = require('path')
const fs = require('fs')
const http = require('http')
const https = require('https')
const port = process.env.PORT || 3001
var todoServer = express()
todoServer.set('x-powered-by', false)


todoServer.use((req, res, next) => {
  console.log('IP: ', req.ip)
  console.log('METHOD: ', req.method)
  next()
})
todoServer.use(express.static(path.join(__dirname, './node_modules')))
todoServer.use(express.static(path.join(__dirname, './static')))
todoServer.get('/', (req, res) => {
  res.sendFile('./static/todoVue.html', {
    root: __dirname
  })
})

var httpsServer = https.createServer({
  key: fs.readFileSync('/root/.acme.sh/vps.billid.club/vps.billid.club.key'),
  cert: fs.readFileSync('/root/.acme.sh/vps.billid.club/vps.billid.club.cer')
}, todoServer).listen(port, () => console.log('listening on port: ', port))