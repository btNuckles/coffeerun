(function (window) {
  'use strict';
  var App = window.App || {};

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }

  function consoleLog(string) {
    console.log(string)
    return string;
  }

  Truck.prototype.createOrder = function (order) {
    var log = consoleLog('Adding order for ' + order.emailAddress);
    this.db.add(order.emailAddress, order);
    return log;
  };

  Truck.prototype.deliverOrder = function (customerId) {
    var log = consoleLog('Delivering order for ' + customerId);
    this.db.remove(customerId);
    return log;
  };

  Truck.prototype.printOrders = function () {
    var customerIdArray = Object.keys(this.db.getAll());

    var log = consoleLog('Truck #' + this.truckId + ' has pending orders:');
    customerIdArray.forEach(function (id) {
    console.log(this.db.get(id));
    }.bind(this));
    return log;
  };

  App.Truck = Truck;
  window.App = App;

})(window);
