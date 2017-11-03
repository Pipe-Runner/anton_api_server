const express = require('express');
const router = express.Router();
const vehicle = require('../models/vehicle');

router.get('/fetchall', function(req, res, next) {
  vehicle.fetchAll(function(err, rows) {
    if (err) {
      res.json({ code: '404', error: 'Problem in Query' });
    } else {
      res.json({
        code: '200',
        error: 'none',
        vehicle: rows,
      });
    }
  });
});

router.post('/add', function(req, res, next) {
  const name = req.body.name;
  const fuelType = req.body.fuelType;

  vehicle.add(name, fuelType, function(err, rows) {
    if (err) {
      res.json({ code: '404', error: 'Problem in Query' });
    } else {
      vehicle.fetchAll(function(err, rows) {
        if (err) {
          res.json({ code: '404', error: 'Problem in Query' });
        } else {
          res.json({
            code: '200',
            error: 'none',
            vehicle: rows,
          });
        }
      });
    }
  });
});

module.exports = router;
