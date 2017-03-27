/* eslint global-require: [0] */
'use strict';

var test = require('tap').test;
var queue = require('queue-async');
var path = require('path');
var fs = require('fs');

var comparators = require('../index');

test('Test compare functions', function(assert) {
  var fileQueue = queue(1);  // Read one fixture file at a time.

  var dirname = path.join(__dirname, '/fixtures/');
  var files = fs.readdirSync(dirname);
  files = files.filter(function(filename) { return /.json$/.test(filename); });
  files.forEach(function(filename) {
    var jsonData = JSON.parse(fs.readFileSync(path.join(dirname, filename), 'utf-8'));
    fileQueue.defer(processFixtureFile, assert, jsonData);
  });

  fileQueue.awaitAll(function() {
    assert.end();
  });
});

test('Test basic fixture', function(assert) {
  var comparatorQueue = queue(10);
  Object.keys(comparators).forEach(function(comparator) {
    var compareFunction = comparators[comparator];
    var jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, '/basicFixture.json'), 'utf-8'));
    jsonData.fixtures.forEach(function(fixture) {
      comparatorQueue.defer(compareFunction, fixture.oldVersion, fixture.newVersion);
    });
  });
  comparatorQueue.awaitAll(function(err, result) {
    assert.ifError(err);
    assert.end();
  });
});

function processFixtureFile(assert, jsonData, callback) {
  // Fixtures with empty string as compareFunction as run on all compare functions.
  if (jsonData.compareFunction === '') {
    return callback();
  }

  var fixtureQueue = queue(5);  // Process more than one fixture in a file.
  // ToFix: "../" is not very intuitive.
  var compareFunction = comparators[jsonData.compareFunction];
  if (typeof compareFunction !== 'function') console.error('Not compare function', jsonData.compareFunction);
  jsonData.fixtures.forEach(function (fixture) {
    fixtureQueue.defer(processFixture, assert, compareFunction, fixture);
  });
  fixtureQueue.awaitAll(function() {
    callback();
  });
}

function processFixture(assert, compareFunction, fixture, callback) {
  compareFunction(fixture.newVersion, fixture.oldVersion, function(err, result) {
    if (err) {
      return callback(err);
    }
    assert.deepEqual(result, fixture.expectedResult, fixture.description);
    callback();
  });
}
