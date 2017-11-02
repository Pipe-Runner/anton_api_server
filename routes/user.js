// Routes for user related queries

var express = require('express');
var router = express.Router();
var user = require('../models/user');
var employee = require('../models/employee');

router.post('/login', function(req, res, next) {
  var emailId = req.body.emailId;
  var passwordHash = req.body.password;
  var contactNumber = req.body.contactNumber;

  user.find(emailId, passwordHash, contactNumber, function(err, rows) {
    if (err) {
      console.log(err);
      res.json({ code: '404', error: 'Problem in query' });
    } else {
      if (rows.length !== 0) {
        var fullName = rows[0].fullName;
        var emailId = rows[0].emailId;
        var contactNumber = rows[0].contactNumber;
        var userLevel = rows[0].userLevel;
        var id = rows[0].id;

        // checking if employee
        employee.findByUserId(rows[0].id, function(err, rows) {
          if (err) {
            console.log(err);
            res.json({ code: '404', error: 'Problem in query' });
          } else {
            console.log(rows);
            if (rows.length === 0) {
              res.json({
                code: '200',
                error: 'none',
                fullName: fullName,
                emailId: emailId,
                contactNumber: contactNumber,
                userLevel: userLevel,
                userId: id,
              });
            } else {
              res.json({
                code: '200',
                error: 'none',
                fullName: fullName,
                emailId: emailId,
                contactNumber: contactNumber,
                userLevel: userLevel,
                userId: id,
                employeeId: rows[0].id,
              });
            }
          }
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

router.get('/fetchall', function(req, res, next) {
  user.fetchAll(function(err, rows) {
    if (err) {
      console.log(err);
      res.json({ code: '404', error: 'Problem in query' });
    } else {
      res.json({ code: '200', error: 'none', userList: rows });
    }
  });
});

router.post('/makeemployee', function(req, res, next) {
  const userId = req.body.userId;
  const fullName = req.body.fullName;
  const contactNumber = req.body.contactNumber;

  console.log(req.body);
  user.changeStatus(userId, undefined, function(err, rows) {
    if (err) {
      console.log(err);
    } else {
      employee.addByUserId(userId, fullName, contactNumber, null, function(err, rows) {
        if (err) {
          console.log(err);
          res.json({ code: '404', error: 'Problem in query' });
        } else {
          user.fetchAll(function(err, rows) {
            if (err) {
              console.log(err);
              res.json({ code: '404', error: 'Problem in query' });
            } else {
              res.json({ code: '200', error: 'none', userList: rows });
            }
          });
        }
      });
    }
  });
});

router.post('/changeuserstatus', function(req, res, next) {
  var userId = req.body.userId;
  var employeeId = req.body.employeeId;
  var userLevel = req.body.userLevel;
  var isWorking = req.body.isWorking;

  user.changeStatus(userId, userLevel, function(err, rows) {
    if (err) {
      console.log(err);
      res.json({ code: '404', error: 'Problem in query' });
    } else {
      employee.changeStatus(employeeId, isWorking, function(err, rows) {
        if (err) {
          console.log(err);
          res.json({ code: '404', error: 'Problem in query' });
        } else {
          user.fetchAll(function(err, rows) {
            if (err) {
              console.log(err);
              res.json({ code: '404', error: 'Problem in query' });
            } else {
              res.json({ code: '200', error: 'none', userList: rows });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
