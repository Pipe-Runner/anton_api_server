// Contains supplier fetch, add parts to bill, search parts methods

var db = require('../dbconnection');

var Vehicle = {
  fetchAll: function(callback) {
    return db.query('SELECT * from vehicle', [], callback);
  },
  add: function(name, fuelType, callback) {
    return db.query(
      'INSERT INTO vehicle( name, fuelType ) values( ?, ? )',
      [name, fuelType],
      callback
    );
  },
  findByCredentials(name, fuelType, callback) {
    return db.query(
      'SELECT FROM vehicle WHERE fullName=? AND contactNumber=?',
      [fullName, contactNumber],
      callback
    );
  },
};

module.exports = Vehicle;
