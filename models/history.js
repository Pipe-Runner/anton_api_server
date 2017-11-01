// Contains history fetch, add parts to bill, search parts methods

var db = require('../dbconnection');

var History = {
  getCount: function() {},
  fetchAll: function(callback) {
    return db.query(
      'SELECT h.id, t.id as transactionId, u.emailId as userEmailId, e.id as employeeId, e.fullName as employeeName, t.amount as transactionAmount, t.date as transactionDate, t.transactionType from history as h, employee as e, user as u,transaction as t where h.employeeId=e.id AND h.userId=u.id AND h.transactionId=t.id;',
      callback
    );
  },
  add: function(userId, employeeId, transactionId, callback) {
    return db.query(
      'INSERT INTO history( userId, employeeId, transactionId ) values( ?, ?, ? );',
      [userId, employeeId, transactionId],
      callback
    );
  },
};

module.exports = History;
