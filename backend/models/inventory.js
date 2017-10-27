// Contains inventory fetch, add parts to bill, search parts methods

var db = require('../dbconnection');

var Inventory = {
  getAll: function(callback) {
    return db.query(
      'SELECT a.id, a.partType, a.modelNumber, a.price, b.name as supplierName, a.storedAt, a.vehicleName, a.fuelType FROM parts as a, suppliers as b WHERE a.supplierId=b.id',
      callback
    );
  },
};

module.exports = Inventory;
