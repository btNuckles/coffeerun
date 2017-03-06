(function (window) {
  'use strict';
  var App = window.App || {};

  function DataStore() {
    this.data = {};
  }

  DataStore.prototype.add = function (key, val) {
    this.data[key] = val;
  }

  DataStore.prototype.get = function (key) {
    return this.data[key];
  };

  DataStore.prototype.getAll = function () {
    return this.data;
  };

  DataStore.prototype.remove = function (key) {
   delete this.data[key];
 };

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }

  Truck.prototype.createOrder = function (order) {
    console.log('Adding order for ' + order.emailAddress);
    this.db.add(order.emailAddress, order);
  };

  Truck.prototype.deliverOrder = function (customerId) {
    console.log('Delivering order for ' + customerId);
    this.db.remove(customerId);
  };

  Truck.prototype.printOrders = function () {
    var customerIdArray = Object.keys(window.myTruck.db.getAll());

    console.log('Truck #' + window.truckId + ' has pending orders:');
    customerIdArray.forEach(function (id) {
      console.log(window.myTruck.db.get(id));
    }.bind(this));
  };

  App.DataStore = DataStore;
  App.Truck = Truck;
  window.App = App;
  var myTruck = new Truck('ncc-1701', new DataStore());
  window.myTruck = myTruck;

})(window);

QUnit.test( "DataStore Add", function( assert ) {
  var ds = new App.DataStore();
  ds.add('m@bond.com', 'tea');
  ds.add('james@bond.com', 'eshpressho');
  ds.getAll();
  assert.ok(ds.getAll(), "Passed!");
});

QUnit.test( "DataStore Remove", function( assert ) {
  var ds = new App.DataStore();
  ds.add('james@bond.com', 'eshpressho');
  ds.remove('james@bond.com');
  assert.ok( ds.get('james@bond.com') == undefined, "Passed!" );
});

QUnit.test( "DataStore Get", function( assert ) {
  var ds = new App.DataStore();
  ds.add('m@bond.com', 'tea');
  ds.add('james@bond.com', 'eshpressho');
  assert.ok( ds.get('james@bond.com') == "eshpressho", "Passed!" );
});

myTruck.createOrder({ emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
myTruck.createOrder({ emailAddress: 'dr@no.com', coffee: 'decaf'});
myTruck.createOrder({ emailAddress: 'm@bond.com', coffee: 'earl grey'});
myTruck.printOrders();
window.myTruck.deliverOrder('me@goldfinger.com');
myTruck.deliverOrder('m@bond.com');
myTruck.printOrders();

QUnit.test( "Create Orders", function( assert ) {
  window.myTruck.createOrder({ emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
  var orderInfo = window.myTruck.db.get('me@goldfinger.com');
  assert.ok(orderInfo.coffee == 'double mocha', "Passed!" );
});

QUnit.test("Fill Order", function (assert) {
  window.myTruck.createOrder({ emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
  window.myTruck.deliverOrder('me@goldfinger.com');
  var orderInfo = window.myTruck.db.get('me@goldfinger.com');
  assert.ok(orderInfo == undefined, "Passed!" );
})
