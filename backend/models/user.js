// Contains user methods

var db = require('../dbconnection');

var User = {
  find: function(emailId, passwordHash, contactNumber, callback) {
    return db.query(
      'SELECT * FROM user WHERE emailId=? AND passwordHash=? AND contactNumber=?',
      [emailId, passwordHash, contactNumber],
      callback
    );
  },
  findByCredentials: function(emailId, contactNumber, callback) {
    if (contactNumber === undefined) {
      return db.query('SELECT * FROM user WHERE emailId=?', [emailId], callback);
    } else {
      return db.query(
        'SELECT * FROM user WHERE emailId=? AND contactNumber=?;',
        [emailId, contactNumber],
        callback
      );
    }
  },
  add: function(fullName, emailId, passwordHash, contactNumber, callback) {
    return db.query(
      'INSERT INTO user( fullName,emailId, passwordHash, contactNumber) VALUES( ?, ?, ?, ? )',
      [fullName, emailId, passwordHash, contactNumber],
      callback
    );
  },
};

module.exports = User;
