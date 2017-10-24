var mysql = require('mysql');

var connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'humbleDiscipulus#1998',
  database: 'antontestdb',
});

module.exports = connection;
