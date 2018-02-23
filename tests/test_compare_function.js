'use strict';

var fs = require('fs');
var path = require('path');
var queue = require('queue-async');
var comparators = require('../index');
var nock = require('nock');
var clc = require('cli-color');

(function() {
  if (process.argv.length !== 3) {
    console.log('\nUsage: node test_compare_function.js fixture_filename\n');
    return;
  }

  nock('http://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7')
    .get(
      '/16/46886/30383.mvt?access_token=pk.eyJ1IjoiYW1pc2hhIiwiYSI6ImNpcWt1bWc4bjAzOXNmdG04bng4dHVhZ3EifQ.bJK6rpjNmiP3kW2pROdScg'
    )
    .reply(
      200,
      fs.readFileSync(path.join(__dirname, 'result_feature_overlap.pbf'))
    );

  var filename = process.argv[2];
  var jsonData = JSON.parse(fs.readFileSync(path.join('.', filename), 'utf-8'));
  var compareFunction = comparators[jsonData.compareFunction];

  jsonData.fixtures.forEach(function(fixture) {
    compareFunction(
      fixture.newVersion,
      fixture.oldVersion,
      function(error, result) {
        console.log(result);
        console.log(fixture.description);
        console.log(clc.yellow('expected', fixture.expectedResult));
        if (error) console.log(clc.red(error));
        console.log(clc.yellow('actual', JSON.stringify(result)));
        if (
          JSON.stringify(fixture.expectedResult) !==
          JSON.stringify(removeMessage(result))
        ) {
          console.log(clc.red('Test FAILED! Actual is not expected!\n'));
        } else {
          console.log(
            clc.green('OK! Test passed! Actual is same as expected\n')
          );
        }
      }
    );
  });
})();

function removeMessage(result) {
  // console.log(result);
  // if (result.message){
  //   delete result.message;
  // }
  return result;
}
