var mysql = require('mysql');

var connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'awp',
  database: 'nitrodb',
});

module.exports = connection;
