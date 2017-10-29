// Contains inventory fetch, add parts to bill, search parts methods

var db = require('../dbconnection');

var Inventory = {
  fetchSoldCount: function(callback) {
    return db.query('SELECT COUNT(*) FROM part WHERE historyId IS NOT NULL;', callback);
  },
  fetchAll: function(callback) {
    return db.query(
      'SELECT p.id, p.partType, p.modelNumber, p.cost, s.fullName as supplierName, v.name as vehicle, v.fuelType, p.storedAt FROM part as p, supplier as s, vehicle as v WHERE p.vehicleId=v.id AND p.supplierId=s.id AND p.historyId=NULL',
      callback
    );
  },
  getByQuery: function() {},
  add: function() {},
};

module.exports = Inventory;
