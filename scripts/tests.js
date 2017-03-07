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
