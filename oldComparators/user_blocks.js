'use strict';

var fs = require('fs');
var path = require('path');

module.exports = user_blocks;

/**
* Return number of user blocks received by mapper in OpenStreetMap.
* @param {object} newVersion Features new version in GeoJSON.
* @param {object} oldVersion Features old version in GeoJSON.
* @param {Function} callback called with (error, result).
* @returns {undefined} calls callback.
*/
function user_blocks(newVersion, oldVersion, callback) {
  var cfVersion = 1;

  if (!newVersion) return callback();

  // When a feature is deleted, it does not have any properties.
  var user = newVersion.properties
    ? newVersion.properties['osm:user']
    : newVersion['user'];

  var user_blocks_file = path.join(__dirname, '../data/user_blocks.json');
  var userBlocks = JSON.parse(fs.readFileSync(user_blocks_file, 'utf-8'));

  var counter = 0;
  userBlocks.forEach(function(userBlock) {
    if (userBlock['blocked_user'] === user) {
      counter += 1;
    }
  });
  return callback(null, {
    'result:user_blocks': {
      cfVersion: cfVersion,
      blocks: counter
    }
  });
}
