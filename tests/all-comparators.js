'use strict';

var path = require('path');
var fs = require('fs');
var queue = require('d3-queue').queue;
var comparators = require('../');

var dirname = path.join(__dirname, '/fixtures/');
var filename = 'all-comparators.json';
var jsonData = JSON.parse(fs.readFileSync(path.join(dirname, filename), 'utf-8'));

var q = queue();
for (var i = 0; i < jsonData.fixtures.length; i++) {
  var fixture = jsonData.fixtures[i];

  Object.keys(comparators).map(function(comparator) {
    q.defer(comparators[comparator], fixture.newVersion, fixture.oldVersion);
    return null;
  });
}
q.awaitAll(function (error, results) {
  for (var i = 0; i < results.length; i++) {
    if (Object.keys(results[i]).length > 0) {
      console.log(results[i]);
    }
  }
});
