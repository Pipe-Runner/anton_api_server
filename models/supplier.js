// Contains supplier fetch, add parts to bill, search parts methods

var db = require('../dbconnection');

var Supplier = {
  fetchAll: function(callback) {
    return db.query('SELECT * from supplier', [], callback);
  },
  add: function(fullName, contactNumber, address, callback) {
    return db.query(
      'INSERT INTO supplier( fullName, contactNumber, address ) values( ?, ?, ? )',
      [fullName, contactNumber, address],
      callback
    );
  },
  findByCredentials(fullName, contactNumber, callback) {
    return db.query(
      'SELECT FROM supplier WHERE fullName=? AND contactNumber=?',
      [fullName, contactNumber],
      callback
    );
  },
};

module.exports = Supplier;
