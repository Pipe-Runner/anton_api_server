// Routes for customer related endpoints

var express = require('express');
var router = express.Router();
var customer = require('../models/customers');

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var passwordHash = req.body.passwordHash;
  var contactNumber = req.body.contactNumber;
  var isAdmin = req.body.isAdmin;

  customer.find(username, passwordHash, contactNumber, isAdmin, function(err, rows) {
    if (err) {
      console.log(err);
      res.json({ code: '404', errorMessage: 'problem in query' });
    } else {
      console.log(rows);
      res.json({ data: rows[0] });
    }
  });
});

router.post('/signup', function(req, res, next) {
  var username = req.body.username;
  var passwordHash = req.body.passwordHash;
  var contactNumber = req.body.contactNumber;
  var adminToken = req.body.adminToken;

  customer.add(username, passwordHash, contactNumber, adminToken, function(err, rows) {
    if (err) {
      console.log(err);
      res.json({ code: '404', errorMessage: 'problem in query' });
    } else {
      console.log(rows);
      res.json({ code: 'successful', errorMessage: 'none' });
    }
  });
});

module.exports = router;
