// Contains login, logout, signup methods

var db = require('../dbconnection');

var ADMIN_TOKEN = '123abc';

var Customers = {
  find: function(username, passwordHash, contactNumber, isAdmin, callback) {
    if (isAdmin === true) {
      return db.query(
        'SELECT * FROM customers WHERE username=? AND passwordHash=? AND contactNumber=? AND isAdmin=?',
        [username, passwordHash, contactNumber, true],
        callback
      );
    } else {
      return db.query(
        'SELECT * FROM customers WHERE username=? AND passwordHash=? AND contactNumber=? AND isAdmin=?',
        [name, passwordHash, contactNumber, false],
        callback
      );
    }
  },
  add: function(username, passwordHash, contactNumber, adminToken, callback) {
    if (adminToken === ADMIN_TOKEN) {
      return db.query(
        'INSERT INTO customers VALUE( ?, ?, ?, ? )',
        [username, passwordHash, contactNumber, true],
        callback
      );
    } else {
      return db.query(
        'INSERT INTO customers VALUE( ?, ?, ?, ? )',
        [username, passwordHash, contactNumber, false],
        callback
      );
    }
  },
};

module.exports = Customers;
