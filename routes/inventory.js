// Routes for inventory related endpoints

var express = require('express');
var router = express.Router();
var inventory = require('../models/inventory');
var booking = require('../models/booking');
var transaction = require('../models/transaction');

router.get('/fetchsoldcount', function(req, res, next) {
  const partCount = 0;
  const bookingCount = 0;
  const transactionCount = 0;

  inventory.fetchSoldCount(function(err, rows) {
    if (err) {
      console.log(err);
      res.json({ code: '404', error: 'problem in query' });
    } else {
      const partCount = rows[0]['COUNT(*)'];
      booking.fetchSoldCount(function(err, rows) {
        if (err) {
          console.log(err);
          res.json({ code: '404', error: 'problem in query' });
        } else {
          const bookingCount = rows[0]['COUNT(*)'];
          transaction.fetchSoldCount(function(err, rows) {
            if (err) {
              console.log(err);
              res.json({ code: '404', error: 'problem in query' });
            } else {
              const transactionCount = rows[0]['COUNT(*)'];
              res.json({
                code: '200',
                error: 'none',
                transactionCount: transactionCount,
                partCount: partCount,
                bookingCount: bookingCount,
              });
            }
          });
        }
      });
    }
  });
});

router.get('/fetchall', function(req, res, next) {
  inventory.fetchAll(function(err, rows) {
    if (err) {
      console.log(err);
      res.json({ code: '404', error: 'problem in query' });
    } else {
      res.json({
        code: '200',
        error: 'none',
        parts: rows,
      });
    }
  });
});

// router.post('/addpartstobill', function(req, res, next) {
//   var username = req.body.username;
//   var passwordHash = req.body.password;
//   var contactNumber = req.body.contactNumber;
//   var isAdmin = req.body.isAdmin;

//   customer.find(username, passwordHash, contactNumber, isAdmin, function(err, rows) {
//     if (err) {
//       console.log(err);
//       res.json({ code: '404', error: 'problem in query' });
//     } else {
//       if (rows.length !== 0) {
//         console.log(rows);
//         res.json({
//           code: '200',
//           error: 'none',
//           username: rows[0].username,
//           isAdmin: rows[0].isAdmin,
//         });
//       } else {
//         res.json({ code: '404', error: 'User not signed up' });
//       }
//     }
//   });
// });

// router.post('/searchparts', function(req, res, next) {
//   console.log(req.body);
//   res.json({ code: '200', error: 'none' });
// });

module.exports = router;
