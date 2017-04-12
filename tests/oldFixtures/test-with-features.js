'use strict';
var test = require('tap').test;
var queue = require('queue-async');
var compareAll = require('../lib/compare_all');
var fs = require('fs');
var path = require('path');

// This test requires DynamoDB access, so we short-circuit on CircleCI tests.
if (!process.env.CIRCLECI) {
  test('test suspicious features', function(assert) {
    var q = queue(2);
    var dirname = path.join(__dirname, '/fixtures/features/');
    var files = fs.readdirSync(dirname);
    files.forEach(function(filename) {
      var content = fs.readFileSync(path.join(dirname, filename), 'utf-8');
      q.defer(runObjectTest, assert, content);
    });
    q.awaitAll(function() {
      assert.end();
    });
  });
}

function runObjectTest(assert, content, callback) {
  var json = JSON.parse(content);
  var current = json.features[0];
  var previous = json.features[1];
  var expectedProperties = json.properties;
  compareAll(current, previous, function(err, result) {
    if (err) {
      console.log('error', err);
    }
    for (var prop in expectedProperties) {
      assert.deepEqual(
        result[prop],
        expectedProperties[prop],
        prop + ' as expected'
      );
    }
    callback(null, null);
  });
}
