var express = require('express'),
app = express(),
bodyParser = require('body-parser');
port = process.env.PORT || 3000;

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: 'dbo'
});

mc.connect();

app.listen(port);

// Add headers
app.use(function (req, res, next) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Pass to next layer of middleware
    next();
});

console.log('Citas RESTful API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/approutes'); //importing route
routes(app); //register the route