// Routes for employee related queries

var express = require('express');
var router = express.Router();
var employee = require('../models/employee');
var user = require('../models/user');

router.post('/fetchall', function(req, res, next) {
  var emailId = req.body.emailId;
  var contactNumber = req.body.contactNumber;

  user.find(emailId, contactNumber, function(err, rows) {
    if (err) {
      console.log(err);
      res.json({ code: '404', error: 'Problem in query' });
    } else {
      if (rows[0].userLevel < 2) {
        res.json({ code: '300', error: 'Unauthorized Request!' });
      } else {
        employee.fetchAll(function(err, rows) {
          res.json({ code: '200', error: 'none', userList: rows });
        });
      }
    }
  });
});

// Add employee

module.exports = router;
