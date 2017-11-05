// Routes for inventory related endpoints

const eachOf = require('async/eachOf');
const express = require('express');
const router = express.Router();
const inventory = require('../models/inventory');
const booking = require('../models/booking');
const transaction = require('../models/transaction');
const history = require('../models/history');
const user = require('../models/user');

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

router.post('/addpartstobill', function(req, res, next) {
  const employeeId = req.body.employeeId;
  const emailId = req.body.customerEmailId;
  const contactNumber = req.body.customerContactNumber;
  const cart = req.body.cart;
  const amount = req.body.amount;

  const currentDateTime = new Date();
  const transactionTime = currentDateTime.toLocaleTimeString();
  const transactionDate = currentDateTime.toLocaleDateString();

  // find the userId using credentials
  user.findByCredentials(emailId, contactNumber, function(err, rows) {
    if (err) {
      res.json({ code: '404', error: 'Problem in Query' });
    } else {
      // if successful add transaction
      if (rows.length !== 1) {
        res.json({ code: '404', error: 'Could Not Find Customer' });
      } else {
        const userId = rows[0].id;
        const userName = rows[0].fullName;

        transaction.add(
          'CASH',
          'SALE',
          contactNumber,
          amount,
          transactionDate,
          transactionTime,
          userName,
          function(err, rows) {
            if (err) {
              res.json({ code: '404', error: 'Error in adding transaction' });
            } else {
              // if successful, find the id given to that transaction
              transaction.findByCredentials(
                'CASH',
                userName,
                contactNumber,
                transactionDate,
                transactionTime,
                function(err, rows) {
                  if (rows.length !== 1 && false) {
                    res.json({ code: '404', error: 'Error in finding transaction' });
                  } else {
                    // if successful, add the above data to history along with employee ID
                    const transactionId = rows[0].id;
                    history.add(userId, employeeId, transactionId, function(err, rows) {
                      if (err) {
                        res.json({ code: '404', error: 'Could Not Add To History' });
                      } else {
                        // Find the ID given to the history
                        history.findByTransactionId(transactionId, function(err, rows) {
                          if (err) {
                            res.json({ code: '404', error: 'Could Not Find History' });
                          } else {
                            // if successful, use the history id to update the cart entries
                            const historyId = rows[0].id;
                            console.log('historyId: ' + historyId);
                            eachOf(
                              cart,
                              function(item, index, callback) {
                                inventory.sell(item.id, historyId, callback);
                              },
                              function(err) {
                                console.log('reached final callback');
                                if (err) {
                                  res.json({ code: '404', error: 'Problem In Query' });
                                } else {
                                  // final callback to send in the new list of items
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
                                }
                              }
                            );
                          }
                        });
                      }
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  });
});

router.post('/add', function(req, res, next) {
  const partType = req.body.partType;
  const modelNumber = req.body.modelNumber;
  const cost = req.body.cost;
  const vehicleId = req.body.vehicleId;
  const supplierId = req.body.supplierId;
  const storedAt = req.body.storedAt;

  console.log(req.body);

  inventory.add(partType, modelNumber, cost, supplierId, storedAt, vehicleId, function(err, rows) {
    if (err) {
      console.log(err);
      res.json({ code: '404', error: 'Problem in Query' });
    } else {
      res.json({
        code: '200',
        error: 'none',
      });
    }
  });
});

module.exports = router;
