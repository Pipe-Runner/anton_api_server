// Contains user methods

var db = require('../dbconnection');

var User = {
  fetchAll: callback => {
    return db.query(
      'select u.id, u.fullName, u.emailId, u.contactNumber, u.userLevel, e.id as employeeId, e.isWorking from user as u LEFT JOIN employee as e on e.userId=u.id;',
      [],
      callback
    );
  },
  find: function(emailId, passwordHash, contactNumber, callback) {
    if (passwordHash === undefined) {
      return db.query(
        'SELECT * FROM user WHERE emailId=? AND contactNumber=?',
        [emailId, contactNumber],
        callback
      );
    } else {
      return db.query(
        'SELECT * FROM user WHERE emailId=? AND passwordHash=? AND contactNumber=?',
        [emailId, passwordHash, contactNumber],
        callback
      );
    }
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
  changeStatus: function(userId, userLevel, callback) {
    if (userLevel === undefined) {
      return db.query('update user set userLevel=1 where id=?;', [userId], callback);
    } else {
      return db.query('update user set userLevel=? where id=?;', [userLevel, userId], callback);
    }
  },
};

module.exports = User;
