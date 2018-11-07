'use strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host: 'wootit.cstmcmlaz2y7.us-east-1.rds.amazonaws.com',
    user: 'wootroot',
    password: 'n%bDdEPNAYn*',
    database: 'dbo'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;