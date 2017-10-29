// Contains employee methods

var db = require('../dbconnection');

var Employee = {
  fetchAll: function(callback) {
    return db.query('SELECT * FROM employee', [], callback);
  },
  findByCredentials: function(contactNumber, callback) {
    return db.query('SELECT * FROM empoyee WHERE contactNumber=?;', [contactNumber], callback);
  },
  add: function(fullname, contactNumber, address, isWorking, callback) {
    return db.query(
      'INSERT INTO user( fullname,contactNumber, address, isWorking) VALUE( ?, ?, ?, ? )',
      [fullname, contactNumber, address, isWorking],
      callback
    );
  },
};

module.exports = Employee;
