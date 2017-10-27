// Contains history fetch, add parts to bill, search parts methods

var db = require('../dbconnection');

var History = {
  getAll: function(callback) {
    return db.query(
      'select a.id, b.name, b.id as employeeId, c.username, c.contactNumber, d.id as transactionId, d.amount from history as a, employees as b, customers as c,transactions as d where a.employeeId=b.id AND a.customerId=c.id AND a.transactionId=d.id;',
      callback
    );
  },
};

module.exports = History;
