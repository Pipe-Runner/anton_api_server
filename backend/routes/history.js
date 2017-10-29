// Routes for history related endpoints

var express = require('express');
var router = express.Router();
var history = require('../models/history');

router.get('/fetchall', function(req, res, next) {
  history.fetchAll(function(err, rows) {
    if (err) {
      console.log(err);
      res.json({ code: '404', error: 'problem in query' });
    } else {
      res.json({
        code: '200',
        error: 'none',
        history: rows,
      });
    }
  });
});

router.post('/searchhistory', function(req, res, next) {
  console.log(req.body);
  res.json({ code: '200', error: 'none' });
});

module.exports = router;
