'use strict';

var request = require('request');
var moment = require('moment');
var queue = require('d3-queue').queue;
var sax = require('sax');

module.exports = pokemonFootway;

function getAccountCreated(userID, callback) {
  var url = ' http://api.openstreetmap.org/api/0.6/user/' + userID;
  request(url, function (error, response, body) {
    if (error) console.log(String(error));

    if (!error && response.statusCode === 200) {
      var accountCreated;

      var parser = sax.createStream(true);
      parser.on('opentag', function(element) {
        if ('attributes' in element && ('account_created' in element.attributes)) {
          accountCreated = element.attributes.account_created;
        }
      });
      parser.on('end', function() {
        return callback(null, moment(accountCreated));
      });
      parser.write(body);
      parser.end();

    } else {
      return callback(null, null);
    }
  });
}

function pokemonFootway(newVersion, oldVersion, callback) {
  var newUserDate = moment([2016, 11, 23]);
  try {
    if (newVersion.properties.highway === 'footway' && newVersion.properties['osm:version'] === 1) {

      var q = queue(1);
      q.defer(getAccountCreated, newVersion.properties['osm:uid']);
      q.awaitAll(function (error, results) {
        var accountCreated = results[0];
        if (accountCreated.unix() >= newUserDate.unix()) {
          return callback(null, {
            'result:pokemonFootway': true,
            'result:escalate': true
          });
        } else {
          return callback(null, {});
        }
      });
    } else {
      return callback(null, {});
    }
  } catch (error) {
    console.log(String(error));
    return callback(null, {});
  }
}
