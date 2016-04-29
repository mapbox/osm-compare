/* eslint global-require: [0] */
'use strict';

var test = require('tap').test;
var queue = require('queue-async');
var path = require('path');
var fs = require('fs');

test('Test compare functions', function(assert) {
  var fileQueue = queue(1);  // Read one fixture file at a time.

  var dirname = path.join(__dirname, '/fixtures/');
  var files = fs.readdirSync(dirname);
  files.forEach(function(filename) {
    var jsonData = JSON.parse(fs.readFileSync(path.join(dirname, filename), 'utf-8'));
    fileQueue.defer(processFixtureFile, assert, jsonData);
  });

  fileQueue.awaitAll(function() {
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
  var compareFunctionPath = path.join('../', 'comparators', jsonData.compareFunction);
  var compareFunction = require(compareFunctionPath);
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
    assert.deepEqual(fixture.expectedResult, result, fixture.description);
    callback();
  });
}
