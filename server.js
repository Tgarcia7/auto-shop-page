require('./model/db')//Init conection to db
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')  
var app = express()

port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname,'./views')));//Views direct access

app.listen(port);
console.log('Citas RESTful API server started on: ' + port);

// Headers for Ajax
app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./routes/approutes')(app)//Importing and registering the routes