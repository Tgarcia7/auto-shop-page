'use strict'
var mysql = require('mysql')
const fs = require('fs')
if (fs.existsSync('../conf.js')) {
  require('../conf')
}

let host = process.env.HOST || 'ds2019.wootit.cr'
let user = process.env.USERDB || 'tallerBilly'
let pass = process.env.PASSDB || 'temp'
let db = process.env.DB || 'dbo'

var connection = mysql.createConnection({
  host: host,
  user: user,
  password: pass,
  database: db
})

connection.connect((err) => {
  if (err) throw err
})

module.exports = connection