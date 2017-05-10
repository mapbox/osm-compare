'use strict';

var fs = require('fs');
var path = require('path');
var queue = require('queue-async');
var comparators = require('../index');
var nock = require('nock');

if (process.argv.length !== 3) {
  console.log('\nUsage: node test_compare_function.js fixture_filename\n');
  return;
}

nock('http://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7')
    .get('/16/46886/30383.mvt?access_token=pk.eyJ1IjoiYW1pc2hhIiwiYSI6ImNpcWt1bWc4bjAzOXNmdG04bng4dHVhZ3EifQ.bJK6rpjNmiP3kW2pROdScg')
.reply(200, fs.readFileSync(path.join(__dirname, 'result_feature_overlap.pbf')));

var filename = process.argv[2];
var jsonData = JSON.parse(fs.readFileSync(path.join('.', filename), 'utf-8'));
var compareFunction = comparators[jsonData.compareFunction];

jsonData.fixtures.forEach(function (fixture) {
  var result = compareFunction(fixture.newVersion, fixture.oldVersion);

  console.log(fixture.description);
  console.log('expected', fixture.expectedResult);

  console.log('actual', JSON.stringify(result), '\n');
  if (JSON.stringify(fixture.expectedResult) !== JSON.stringify(result)) {
    console.log('Test failed! Actual is not expected!');
  } else {
    console.log('Test passed! Actual is same as expected');
  }
});
