var mysql = require('mysql');
var config = require('./dbconfig');

var pool = mysql.createPool(config);

module.exports = pool;