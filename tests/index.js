/* eslint global-require: [0] */
'use strict';

var test = require('tap').test;
var queue = require('queue-async');
var path = require('path');
var fs = require('fs');
var isEmpty = require('lodash').isEmpty;

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

test('Test export modules if hyphenated', function(assert) {
  Object.keys(comparators).forEach(function(comparator) {
    assert.ifError(!(/^[a-z]+(-[a-z]+)*$/.test(comparator)));
  });
  assert.end();
});

test('Test if exported compare functions available', function(assert) {
  var dirname = path.join(__dirname, '../comparators/');
  var files = fs.readdirSync(dirname);
  Object.keys(comparators).forEach(function(comparator) {
    var err = false;
    if (files.indexOf(comparator + '.js') === -1)
      err = true;
    assert.ifError(err);
  });
  assert.end();
});

test('Test if compare function test present', function(assert) {
  var dirname = path.join(__dirname, '/fixtures/');
  var files = fs.readdirSync(dirname);
  Object.keys(comparators).forEach(function(comparator) {
    var err = false;
    if (files.indexOf(comparator + '.json') === -1)
      err = true;
    assert.ifError(err);
  });
  assert.end();
});

test('Test results returned by compare functions', function(assert) {
  /* This test mandates compare function to return either empty result or result
    with `result:cf-name atleast`*/

  var dirname = path.join(__dirname, '/fixtures/');
  Object.keys(comparators).forEach(function(comparator) {
    var jsonData = JSON.parse(fs.readFileSync(path.join(dirname, comparator + '.json'), 'utf-8'));
    var success_result = true;
    jsonData.fixtures.forEach(function (fixture) {
      if (!isEmpty(fixture.expectedResult)) {
        if (!(fixture.expectedResult.hasOwnProperty('result:' + comparator))) {
          success_result = false;
        }
      }
    });
    assert.equal(success_result, true, 'Success result present');
  });
  assert.end();
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
    assert.deepEqual(result, fixture.expectedResult, fixture.description);
    callback();
  });
}
