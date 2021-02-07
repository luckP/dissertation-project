const mysql = require('mysql');
const config = require('./config.js')

const con = mysql.createConnection(config)

module.exports = con;