const express = require('express');
const router = express.Router();
const supplier = require('../models/supplier');

router.get('/fetchall', function(req, res, next) {
  supplier.fetchAll(function(err, rows) {
    if (err) {
      res.json({ code: '404', error: 'Problem in Query' });
    } else {
      res.json({
        code: '200',
        error: 'none',
        supplier: rows,
      });
    }
  });
});

router.post('/add', function(req, res, next) {
  const address = req.body.address;
  const contactNumber = req.body.contactNumber;
  const fullName = req.body.fullName;

  supplier.add(fullName, contactNumber, address, function(err, rows) {
    if (err) {
      res.json({ code: '404', error: 'Problem in Query' });
    } else {
      supplier.fetchAll(function(err, rows) {
        if (err) {
          res.json({ code: '404', error: 'Problem in Query' });
        } else {
          res.json({
            code: '200',
            error: 'none',
            supplier: rows,
          });
        }
      });
    }
  });
});

module.exports = router;
