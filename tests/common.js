'use strict';

var test = require('tap').test;
var queue = require('queue-async');
var path = require('path');
var fs = require('fs');


test('Test compare functions with common fixtures', function(assert) {
  var dirname = path.join(__dirname, '/fixtures/');
  var filename = 'common.json';
  var jsonData = JSON.parse(fs.readFileSync(path.join(dirname, filename), 'utf-8'));

  var fixtureQueue = queue(1);
  jsonData.fixtures.forEach(function(fixture) {
    fixtureQueue.defer(testFixture, assert, fixture);
  });
  fixtureQueue.awaitAll(function() {
    assert.end();
  });
});


/*
* Takes a fixture and tests it on all compare functions.
*/
function testFixture(assert, fixture, callback) {
  var dirname = path.join(__dirname, '..', 'comparators');
  var files = fs.readdirSync(dirname);
  files = files.filter(function(filename) { return /.js$/.test(filename); });

  var compareQueue = queue(1);
  files.forEach(function(filename) {
    compareFunction = filename.split('.')[0];
    var compareFunctionPath = path.join(__dirname, '../', 'comparators', compareFunction);
    var compareFunction = require(compareFunctionPath);
    compareQueue.defer(testFixtureOnCompareFunction, assert, fixture, compareFunction, callback);
  });
  compareQueue.awaitAll(function() {
    callback();
  });
}


/*
* Takes a fixture and a compare function and tests it.
*/
function testFixtureOnCompareFunction(assert, fixture, compareFunction, callback) {
  compareFunction(fixture.newVersion, fixture.oldVersion, function(error, result) {
    assert.error(error);
    callback();
  });
}
