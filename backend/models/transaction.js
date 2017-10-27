// Contains transaction fetch, add parts to bill, search parts methods

var db = require('../dbconnection');

var Transaction = {
  getAll: function(callback) {
    return db.query('select * from transactions;', callback);
  },
};

module.exports = Transaction;
