'use strict';

var request = require('request');

/**
* Gets count of changesets for user who has edited this feature.
* @param {object} newVersion Features new version in GeoJSON.
* @param {object} oldVersion Features old version in GeoJSON.
* @param {Function} callback called with (error, result).
* @returns {undefined} calls callback with number of changesets for user.
*/
function user_changesets(newVersion, oldVersion, callback) {
  var user;
  if (newVersion && 'properties' in newVersion) {
    user = newVersion.properties['osm:user'];
  } else if (newVersion && 'user' in newVersion) {
    user = newVersion['user'];
  } else {
    return callback(null, {});
  }

  callback(null, {});

  // request('http://hdyc.neis-one.org/user/' + user, function (error, response, body) {
  //   try {
  //     var result = {};
  //     if (!error && response.statusCode == 200) {
  //       var json = JSON.parse(body);
  //       var count = 0;
  //       if (json && json.changesets && json.changesets.no) {
  //         count = Number(json.changesets.no);
  //       }
  //       result = {
  //         'result:user_changesets': Number(count)
  //       };
  //     }
  //     callback(null, result);
  //   } catch(e) {
  //     callback(body);
  //     callback(e);
  //   }
  // });
}

module.exports = user_changesets;
