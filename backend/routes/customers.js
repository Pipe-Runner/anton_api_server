// Routes for customer related endpoints

var express = require('express');
var router = express.Router();
var customer = require('../models/customers');

var ADMIN_TOKEN = '123abc';

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var passwordHash = req.body.password;
  var contactNumber = req.body.contactNumber;
  var isAdmin = req.body.isAdmin;

  customer.find(username, passwordHash, contactNumber, isAdmin, function(err, rows) {
    if (err) {
      console.log(err);
      res.json({ code: '404', error: 'problem in query' });
    } else {
      if (rows.length !== 0) {
        console.log(rows);
        res.json({
          code: '200',
          error: 'none',
          username: rows[0].username,
          isAdmin: rows[0].isAdmin,
        });
      } else {
        res.json({ code: '404', error: 'User not signed up' });
      }
    }
  });
});

router.post('/signup', function(req, res, next) {
  var username = req.body.username;
  var passwordHash = req.body.passwordHash;
  var contactNumber = req.body.contactNumber;
  var adminToken = req.body.adminToken;
  var isAdmin = false;

  // does admin token match if provided
  if (adminToken !== '' && adminToken !== ADMIN_TOKEN) {
    res.json({ code: '404', error: 'Wrong admin Token' });
    return;
  } else if (adminToken !== '' && adminToken === ADMIN_TOKEN) {
    isAdmin = true;
  }

  // check if user already exists
  customer.findByUserName(username, function(err, rows) {
    if (rows.length !== 0) {
      res.json({ code: '404', error: 'username already exists' });
    } else {
      customer.add(username, passwordHash, contactNumber, isAdmin, function(err, rows) {
        if (err) {
          res.json({ code: '404', error: 'problem in query' });
        } else {
          res.json({ code: '200', error: 'none' });
        }
      });
    }
  });
});

module.exports = router;
