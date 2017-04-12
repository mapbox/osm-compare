'use strict';

var fs = require('fs');
var path = require('path');
var queue = require('queue-async');

if (process.argv.length !== 3) {
  console.log('\nUsage: node test_compare_function.js fixture_filename\n');
} else {
  var filename = process.argv[2];
  var jsonData = JSON.parse(fs.readFileSync(path.join('.', filename), 'utf-8'));
  var compareFunctionPath = path.join(
    '../',
    'comparators',
    jsonData.compareFunction
  );
  var compareFunction = require(compareFunctionPath);

  jsonData.fixtures.forEach(function(fixture) {
    compareFunction(
      fixture.newVersion,
      fixture.oldVersion,
      function(error, result) {
        console.log(fixture.description);
        console.log('expected', fixture.expectedResult);
        if (error) console.log(error);
        console.log('actual', JSON.stringify(result), '\n');
        if (JSON.stringify(fixture.expectedResult) !== JSON.stringify(result)) {
          console.log('Test failed! Actual is not expected!');
        } else {
          console.log('Test passed! Actual is same as expected');
        }
      }
    );
  });
}
