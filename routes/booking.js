// Routes for booking related endpoints

var express = require('express');
var router = express.Router();
var booking = require('../models/booking');
var user = require('../models/user');
var transaction = require('../models/transaction');
var history = require('../models/history');

router.post('/fetchbycredentials', function(req, res, next) {
  const userId = req.body.userId;

  booking.getByCredentials(userId, function(err, rows) {
    if (err) {
      console.log(err);
      res.json({ code: '404', error: 'problem in query' });
    } else {
      res.json({
        code: '200',
        error: 'none',
        booking: rows,
      });
    }
  });
});

router.post('/verifydata1', function(req, res, next) {
  const emailId = req.body.emailId;
  const userId = req.body.userId;
  const contactNumber = req.body.contactNumber;
  const date = req.body.date;
  const startTime = req.body.time;

  booking.checkTimeSlot(date, startTime, function(err, rows) {
    if (err) {
      console.log(err);
      res.json({ code: '404', error: 'problem in query' });
    } else {
      if (rows.length <= 2) {
        res.json({ code: '200', error: 'none', isAvailable: true });
      } else {
        res.json({ code: '200', error: 'none', isAvailable: false });
      }
    }
  });
});

router.post('/submitbookingdata', function(req, res, next) {
  const userId = req.body.userId;
  const emailId = req.body.emailId;
  const contactNumber = req.body.contactNumber;
  const carName = req.body.carName;
  const fuelType = req.body.fuelType;
  const numberPlate = req.body.numberPlate;
  const date = req.body.date;
  const time = req.body.time;
  const cvv = req.body.cvv;
  const cardOwner = req.body.cardOwner;
  const expiryDate = req.body.expiryDate;
  const bankName = req.body.bankName;

  const currentDateTime = new Date();
  const transactionTime = currentDateTime.toLocaleTimeString();
  const transactionDate = currentDateTime.toLocaleDateString();

  transaction.add(
    'CARD/' + bankName,
    'SERVICE',
    contactNumber,
    1500,
    transactionDate,
    transactionTime,
    cardOwner,
    function(err, rows) {
      if (err) {
        res.json({ code: '404', error: 'Error in adding transaction' });
      } else {
        transaction.findByCredentials(
          'CARD/' + bankName,
          cardOwner,
          contactNumber,
          transactionDate,
          transactionTime,
          function(err, rows) {
            console.log(err);
            if (rows.length !== 1 && false) {
              console.log(rows.length);
              res.json({ code: '404', error: 'Error in finding transaction' });
            } else {
              const startTime = time;
              const transactionId = rows[0].id;
              booking.add(userId, numberPlate, date, startTime, transactionId, function(err, rows) {
                if (err) {
                  console.log(err);
                  res.json({ code: '404', error: 'Problem in Query' });
                } else {
                  res.json({ code: '200', error: 'none' });
                }
              });
            }
          }
        );
      }
    }
  );
});

router.get('/fetchpendingbooking', function(req, res, next) {
  booking.fetchBookingSinceYesterday(function(err, rows) {
    if (err) {
      res.json({ code: '404', error: 'problem in query' });
    } else {
      res.json({ code: '200', error: 'none', booking: rows });
    }
  });
});

router.post('/changebookingstatus', function(req, res, next) {
  var bookingId = req.body.bookingId;
  var userId = req.body.userId;
  var employeeId = req.body.employeeId;
  var transactionId = req.body.transactionId;

  booking.fetchBookingSinceYesterday(function(err, rows) {
    if (err) {
      res.json({ code: '404', error: 'problem in query' });
    } else {
      booking.changeBookingStatus(bookingId, function(err, rows) {
        if (err) {
          res.json({ code: '404', error: 'problem in query' });
        } else {
          history.add(userId, employeeId, transactionId, function(err, rows) {
            if (err) {
              res.json({ code: '404', error: 'problem in query' });
            } else {
              booking.fetchBookingSinceYesterday(function(err, rows) {
                if (err) {
                  res.json({ code: '404', error: 'problem in query' });
                } else {
                  res.json({ code: '200', error: 'none', booking: rows });
                }
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
