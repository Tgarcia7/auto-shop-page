'use strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: 'dbo'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;