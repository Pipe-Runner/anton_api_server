// Contains transaction fetch, add parts to bill, search parts methods

var db = require('../dbconnection');

var Transaction = {
  fetchSoldCount: function(callback) {
    return db.query('SELECT COUNT(*) FROM transaction;', callback);
  },
  fetchAll: function(callback) {
    return db.query('SELECT * from transaction;', callback);
  },
  findByCredentials: function(
    paymentMethod,
    cardOwnerName,
    contactNumberOnCard,
    date,
    time,
    callback
  ) {
    if (cardOwnerName === null) {
      return db.query(
        'SELECT * from transaction WHERE paymentMethod=? AND cardOwnerName is NULL AND contactNumberOnCard=? AND date=? AND time=? ',
        [paymentMethod, contactNumberOnCard, date, time],
        callback
      );
    }
    return db.query(
      'SELECT * from transaction WHERE paymentMethod=? AND cardOwnerName=? AND contactNumberOnCard=? AND date=? AND time=? ',
      [paymentMethod, cardOwnerName, contactNumberOnCard, date, time],
      callback
    );
  },
  add: function(
    paymentMethod,
    transactionType,
    contactNumberOnCard,
    amount,
    date,
    time,
    cardOwnerName,
    callback
  ) {
    return db.query(
      'INSERT into transaction( paymentMethod, amount, transactionType, cardOwnerName, date, time, contactNumberOnCard ) values( ?, ?, ?, ?, ?, ?, ? )',
      [paymentMethod, amount, transactionType, cardOwnerName, date, time, contactNumberOnCard],
      callback
    );
  },
};

module.exports = Transaction;
