var express = require('express'),
app = express(),
bodyParser = require('body-parser');

var path = require('path');

port = process.env.PORT || 3000;

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: 'wootit.cstmcmlaz2y7.us-east-1.rds.amazonaws.com',
    user: 'tallerBilly',
    password: 'temp',
    database: 'dbo'
});

mc.connect();

app.use('/tallerBilly', express.static(path.join(__dirname,'../src')));

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
