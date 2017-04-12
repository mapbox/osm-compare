'use strict';

var fs = require('graceful-fs');
var path = require('path');
var queue = require('queue-async');
var json2csv = require('json2csv');
var fields = ['oldVersion', 'newVersion', 'result'];
var comparators = require('../index');

if (process.argv.length !== 5) {
  console.log(
    '\nUsage: node run_compare_function.js comparator_name path/to/fixturedump numberOfFixtures \n'
  );
  throw new Error('Usage error');
}

var compareFunction = comparators[process.argv[2]];

readFiles(process.argv[3]);
var arr = [];
var count = 0;
function readFiles(dirname) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      console.log(err);
      return;
    }
    var q = queue(10);
    var files = filenames.slice(0, process.argv[4]);
    files.forEach(function(filename) {
      q.defer(readFile, dirname, filename);
    });
    q.awaitAll(function(err, results) {
      if (err) {
        console.log(err);
      }
      try {
        var result = json2csv({data: arr, fields: fields});
        console.log(result + '\n');
        console.log(arr.length + ' / ' + process.argv[4] + ' Caught');
      } catch (err) {
        console.error(err);
      }
    });
  });
}

function readFile(dirname, filename, callback) {
  fs.readFile(dirname + filename, 'utf-8', function(err, content) {
    if (err) {
      console.log(err);
      return;
    }
    content = JSON.parse(content);
    var oldVersion, newVersion;
    if (content['oldVersion']['type']) {
      oldVersion = content['oldVersion'];
    } else {
      oldVersion = null;
    }
    if (content['newVersion']['type']) {
      newVersion = content['newVersion'];
    } else {
      newVersion = null;
    }

    compareFunction(newVersion, oldVersion, function(error, result) {
      if (Object.keys(result).length !== 0) {
        var obj = {
          oldVersion: JSON.stringify(oldVersion),
          newVersion: JSON.stringify(newVersion),
          result: JSON.stringify(result)
        };
        arr.push(obj);
      }
      callback();
    });
  });
}
