/* eslint global-require: [0] */
'use strict';

var test = require('tap').test;
var path = require('path');
var fs = require('fs');
var isEmpty = require('lodash').isEmpty;
var nock = require('nock');
var clc = require('cli-color');

var comparators = require('../index');

nock('http://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7')
  .get(
    '/16/46886/30383.mvt?access_token=pk.eyJ1IjoiYW1pc2hhIiwiYSI6ImNqaHVibzk5ZjBpaGQzcW9uanRrZG1kdTMifQ.YfJF2hRjuxM3FnRghgV7yw'
  )
  .reply(
    200,
    fs.readFileSync(path.join(__dirname, 'result_feature_overlap.pbf'))
  );

nock('http://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7')
  .get(
    '/16/46782/30751.mvt?access_token=pk.eyJ1IjoiYW1pc2hhIiwiYSI6ImNqaHVibzk5ZjBpaGQzcW9uanRrZG1kdTMifQ.YfJF2hRjuxM3FnRghgV7yw'
  )
  .reply(200, fs.readFileSync(path.join(__dirname, 'basic_fixture.pbf')));

test('Test compare functions', function(assert) {
  var dirname = path.join(__dirname, '/fixtures/');
  var files = fs.readdirSync(dirname);
  files = files.filter(function(filename) {
    return /.json$/.test(filename);
  });
  files.forEach(function(filename) {
    var jsonData = JSON.parse(
      fs.readFileSync(path.join(dirname, filename), 'utf-8')
    );
    processFixtureFile(assert, jsonData);
  });
  assert.end();
});

// test('Test basic fixture', function(assert) {
//   Object.keys(comparators).forEach(function(comparator) {
//     var compareFunction = comparators[comparator];
//     var jsonData = JSON.parse(
//       fs.readFileSync(path.join(__dirname, '/basicFixture.json'), 'utf-8')
//     );
//     jsonData.fixtures.forEach(function(fixture) {
//       compareFunction(
//         fixture.newVersion,
//         fixture.oldVersion
//       );
//     });
//   });
//   assert.end();
// });

test('Check if exported modules use underscore', function(assert) {
  Object.keys(comparators).forEach(function(comparator) {
    assert.error(!/^[a-z]+(_[a-z]+)*$/.test(comparator));
  });
  assert.end();
});

test('Check if exported compare functions are available', function(assert) {
  var dirname = path.join(__dirname, '../comparators/');
  var files = fs.readdirSync(dirname);
  Object.keys(comparators).forEach(function(comparator) {
    var err = false;
    if (files.indexOf(comparator + '.js') === -1) {
      err = true;
    }
    assert.error(err);
  });
  assert.end();
});

test('Check if all compare functions have fixtures', function(assert) {
  var dirname = path.join(__dirname, '/fixtures/');
  var files = fs.readdirSync(dirname);
  Object.keys(comparators).forEach(function(comparator) {
    var err = false;
    if (files.indexOf(comparator + '.json') === -1) err = true;
    assert.error(err);
  });
  assert.end();
});

test('Check if result returned by compare functions matches the name', function(assert) {
  /* This test mandates compare function to return either empty result or result
    with `result:cf-name atleast`*/

  var dirname = path.join(__dirname, '/fixtures/');
  Object.keys(comparators).forEach(function(comparator) {
    var jsonData = JSON.parse(
      fs.readFileSync(path.join(dirname, comparator + '.json'), 'utf-8')
    );
    var success_result = true;
    jsonData.fixtures.forEach(function(fixture) {
      if (!isEmpty(fixture.expectedResult)) {
        if (!fixture.expectedResult.hasOwnProperty('result:' + comparator)) {
          console.log(comparator);
          success_result = false;
        }
      }
    });
    assert.equal(success_result, true, 'Success result present');
  });
  assert.end();
});

function processFixtureFile(assert, jsonData) {
  // Fixtures with empty string as compareFunction as run on all compare functions.
  if (jsonData.compareFunction === '') {
    return;
  }

  var compareFunction = comparators[jsonData.compareFunction];
  if (typeof compareFunction !== 'function') {
    console.error('Not compare function', jsonData.compareFunction);
  }
  jsonData.fixtures.forEach(function(fixture) {
    processFixture(compareFunction, fixture);
  });
}

function removeMessage(result) {
  if (result && result.message) {
    delete result.message;
  }
  return result;
}

function processFixture(compareFunction, fixture) {
  compareFunction(
    fixture.newVersion,
    fixture.oldVersion,
    function(error, result) {
      console.log(fixture.description);
      if (error) console.log(clc.red(error));
      if (
        JSON.stringify(fixture.expectedResult) !==
        JSON.stringify(removeMessage(result))
      ) {
        console.log(clc.yellow('expected', fixture.expectedResult));
        console.log(clc.yellow('actual', JSON.stringify(result)));
        throw new Error('Test FAILED! Actual is not expected!\n');
      }
    }
  );
}
