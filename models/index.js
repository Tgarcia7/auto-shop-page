'use strict'
require('dotenv').config()
var mysql = require('mysql')

var connection = mysql.createConnection(process.env.DB_CONN)

connection.connect((err) => {
  if (err) throw err
})

module.exports = connection