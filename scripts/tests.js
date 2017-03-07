// Tests.js cannot recognize the 'this' operator used
// in truck.js because it is out of scope in tests.js.
// To use some of this functionality you must use
// window.myTruck to specify you are using a truck
// method instead of "this"

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

QUnit.test("Print Orders", function (assert) {
  window.myTruck.createOrder({ emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
  var orders = window.myTruck.printOrders();
  // Orders are displayed on console
  assert.ok(true, "Passed!" );
})

QUnit.test( "Create Orders Log", function( assert ) {
  var log = window.myTruck.createOrder({ emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
  var orderInfo = window.myTruck.db.get('me@goldfinger.com');
  assert.ok(log == "Adding order for me@goldfinger.com", "Passed!" );
});

QUnit.test("Fill Order Log", function (assert) {
  window.myTruck.createOrder({ emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
  var log = window.myTruck.deliverOrder('me@goldfinger.com');
  var orderInfo = window.myTruck.db.get('me@goldfinger.com');
  assert.ok(log == "Delivering order for me@goldfinger.com", "Passed!" );
})

QUnit.test("Print Orders Log", function (assert) {
  window.myTruck.createOrder({ emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
  var log = window.myTruck.printOrders();
  // Orders are displayed on console
  assert.ok(log == "Truck #ncc-1701 has pending orders:", "Passed!");
})
