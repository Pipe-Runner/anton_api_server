// Contains booking methods

var db = require('../dbconnection');

var Booking = {
  fetchBookingSinceYesterday: function(callback) {
    return db.query(
      'SELECT b.id, b.userId, b.date, b.startTime, b.isDone, b.numberPlate, b.transactionId, u.fullName, u.emailId, u.contactNumber FROM booking as b, user as u WHERE date>DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND u.id=b.userId;',
      [],
      callback
    );
  },
  changeBookingStatus: function(id, callback) {
    return db.query('UPDATE booking SET isDone=true WHERE id=?;', [id], callback);
  },
  fetchSoldCount: function(callback) {
    return db.query('SELECT COUNT(*) FROM booking WHERE isDone=true;', callback);
  },
  getByCredentials: function(userId, callback) {
    return db.query(
      'SELECT b.id, b.date, b.startTime FROM booking as b, user as c WHERE b.userId = c.id AND c.id=? AND c.userLevel=? AND date>DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND isDone=false;',
      [userId, 0],
      callback
    );
  },

  checkTimeSlot: function(date, startTime, callback) {
    return db.query(
      'SELECT * from booking WHERE ( date=?) AND (( startTime>=? AND startTime<=ADDTIME(?,"02:00:00")) OR ( ?<endTime AND ADDTIME(?,"02:00:00")>=endTime) );',
      [date, startTime, startTime, startTime, startTime],
      callback
    );
  },
  add: function(userId, numberPlate, date, startTime, transactionId, callback) {
    console.log(startTime);
    return db.query(
      'INSERT into booking( userId, numberPlate, date, startTime, endTime, transactionId ) values( ?, ?, ?, ?, ADDTIME(?,"02:00:00"), ? );',
      [userId, numberPlate, date, startTime, startTime, transactionId],
      callback
    );
  },
};

module.exports = Booking;
