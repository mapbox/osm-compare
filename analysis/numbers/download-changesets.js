#!/usr/bin/env node

/*
* Download changesets from osmcha.
*/

var argv = require('minimist')(process.argv.slice(2), {string: 'quadkey'});
var request = require('request');
var csv = require('csv');
var fs = require('fs');
var mkdirp = require('mkdirp');
var moment = require('moment-timezone');
var queue = require('d3-queue').queue;
var path = require('path');

if (!argv.startDate || !argv.endDate || !argv.directory) {
  console.log('');
  console.log('Usage: node download-changesets.js OPTIONS');
  console.log('');
  console.log('  OPTIONS');
  console.log('    --startDate 2017-02-01');
  console.log('    --endDate 2017-02-03');
  console.log('    --directory data/');
  console.log('');
  return;
}

function downloadURL(url, filename, callback) {
  console.log('Downloading: \n' + url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      fs.writeFileSync(filename, body);
      callback(null, filename);
    } else {
      callback(error, undefined);
    }
  });
}

var dateFormatString = 'YYYY-MM-DD';
mkdirp(argv.directory);

var startDate = moment(argv.startDate);
var endDate = moment(argv.endDate);
var days = endDate.diff(startDate, 'days') + 1;  // Adding 1 to include the endDate as well.

var q = queue(1);
for (var i = 0; i < days; i++) {
  // Need to clone to not modify the original object.
  var date = startDate.clone().add(i, 'day');
  var nextDate = date.clone().add(1, 'day');  // Add one to date to get the next date.
  var url = 'http://osmcha.mapbox.com/?date__gte=' + date.format(dateFormatString) + '&date__lte=' + nextDate.format(dateFormatString) + '&is_suspect=False&is_whitelisted=All&harmful=None&checked=All&all_reason=True&render_csv=True'
  var filename = path.join(argv.directory, date.format(dateFormatString) + '.csv');
  q.defer(downloadURL, url, filename);
}
q.awaitAll(function (errors, results) {
  if(errors) console.log(errors);
});
