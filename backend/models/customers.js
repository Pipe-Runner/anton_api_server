// Contains login, logout, signup methods

var db = require('../dbconnection');

var Customers = {
  find: function(username, passwordHash, contactNumber, isAdmin, callback) {
    return db.query(
      'SELECT * FROM customers WHERE username=? AND passwordHash=? AND contactNumber=? AND isAdmin=?',
      [username, passwordHash, contactNumber, isAdmin],
      callback
    );
  },
  findByUserName: function(username, callback) {
    return db.query('SELECT * FROM customers WHERE username=?', [username], callback);
  },
  add: function(username, passwordHash, contactNumber, isAdmin, callback) {
    return db.query(
      'INSERT INTO customers( username, passwordHash, contactNumber, isAdmin) VALUE( ?, ?, ?, ? )',
      [username, passwordHash, contactNumber, isAdmin],
      callback
    );
  },
};

module.exports = Customers;
