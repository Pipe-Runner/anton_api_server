// Routes for transaction related endpoints

var express = require('express');
var router = express.Router();
var transaction = require('../models/transaction');

router.get('/fetchtransaction', function(req, res, next) {
  transaction.getAll(function(err, rows) {
    if (err) {
      console.log(err);
      res.json({ code: '404', error: 'problem in query' });
    } else {
      res.json({
        code: '200',
        error: 'none',
        transaction: rows,
      });
    }
  });
});

router.post('/searchtransaction', function(req, res, next) {
  console.log(req.body);
  res.json({ code: '200', error: 'none' });
});

module.exports = router;
