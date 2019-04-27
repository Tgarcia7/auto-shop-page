require('./models')//Confirms db is alive
require('dotenv').config()

var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var app = express()

app.use('/', express.static(path.join(__dirname, './views')))//Views direct access

app.listen(process.env.PORT)
console.log('Citas RESTful API server started on: ' + process.env.PORT)

//Headers for Ajax
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  // Pass to next layer of middleware
  next()
})

//Convierte el body de las peticiones a JSON
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('./routes/approutes')(app)//Importing and registering the routes