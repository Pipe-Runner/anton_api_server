// Contains employee methods

var db = require('../dbconnection');

var Employee = {
  fetchAll: function(callback) {
    return db.query('SELECT * FROM employee', [], callback);
  },
  findByUserId: function(userId, callback) {
    return db.query(
      'SELECT e.id FROM employee as e, user as u WHERE e.userId=?',
      [userId],
      callback
    );
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
  addByUserId: function(userId, fullname, contactNumber, address, callback) {
    return db.query(
      'INSERT INTO user( fullname,contactNumber, userId, address, isWorking) VALUE( ?, ?, ?, ?, ? )',
      [fullname, contactNumber, userId, address, true],
      callback
    );
  },
};

module.exports = Employee;
