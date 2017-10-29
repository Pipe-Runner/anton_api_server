// Routes for user related queries

var express = require('express');
var router = express.Router();
var user = require('../models/user');

// var ADMIN_TOKEN = '123abc';

router.post('/login', function(req, res, next) {
  var emailId = req.body.emailId;
  var passwordHash = req.body.password;
  var contactNumber = req.body.contactNumber;

  console.log(req.body);

  user.find(emailId, passwordHash, contactNumber, function(err, rows) {
    if (err) {
      console.log(err);
      res.json({ code: '404', error: 'Problem in query' });
    } else {
      if (rows.length !== 0) {
        console.log(rows[0]);
        res.json({
          code: '200',
          error: 'none',
          fullName: rows[0].fullName,
          emailId: rows[0].emailId,
          contactNumber: rows[0].contactNumber,
          userLevel: rows[0].userLevel,
          userId: rows[0].id,
        });
      } else {
        res.json({ code: '404', error: 'user not found!' });
      }
    }
  });
});

router.post('/signup', function(req, res, next) {
  var fullName = req.body.fullName;
  var emailId = req.body.emailId;
  var passwordHash = req.body.password;
  var contactNumber = req.body.contactNumber;

  user.findByCredentials(emailId, undefined, function(err, rows) {
    if (rows.length !== 0) {
      res.json({ code: '404', error: 'EmailId already exists' });
    } else {
      user.add(fullName, emailId, passwordHash, contactNumber, function(err, rows) {
        if (err) {
          res.json({ code: '404', error: 'Problem in query' });
        } else {
          user.findByCredentials(emailId, contactNumber, function(err, rows) {
            if (err) {
              res.json({ code: '404', error: 'Login Problem' });
            } else {
              res.json({
                code: '200',
                error: 'none',
                fullName: rows[0].fullName,
                emailId: rows[0].emailId,
                contactNumber: rows[0].contactNumber,
                userLevel: rows[0].userLevel,
                userId: rows[0].id,
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
