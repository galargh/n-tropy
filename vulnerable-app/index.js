var express = require('express')
var bodyParser = require('body-parser')
var checkAccept = require('./helpers/accept')
var cors = require('./helpers/cors')
var app = express()

app.use(bodyParser.json())
app.use(checkAccept)
app.use(cors)

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/static/index.html')
})
app.post('/secret', require('./helpers/check'), require('./controllers/get'))
app.post('/password', require('./controllers/set'))

app.listen(8888, function() {
    console.log('Try and break me on port 8888!')
})
