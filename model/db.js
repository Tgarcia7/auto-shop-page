'use strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host: 'ds2019.wootit.cr',
    user: 'tallerBilly',
    password: 'temp',
    database: 'dbo'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;