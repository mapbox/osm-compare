'use strict';

var request = require('request');

module.exports = waterFeatureByNewUser;

function isWaterFeature(feature) {
  var landuse_values = ['pond', 'reservoir', 'salt_pond', 'basin'];

  var properties = feature.properties;

  if (properties.hasOwnProperty('natural') && properties['natural'] === 'water') return true;
  if (properties.hasOwnProperty('water')) return true;
  if (properties.hasOwnProperty('landuse') && (landuse_values.indexOf(properties['landuse']) !== -1)) return true;
  if (properties.hasOwnProperty('reservoir_type') && properties['reservoir_type'] === 'water_storage') return true;
  if (properties.hasOwnProperty('man_made') && properties['man_made'] === 'reservoir_covered') return true;
  if (properties.hasOwnProperty('waterway')) return true;

  return false;
}

function getUserDetails(user, callback) {
  var url = 'https://osm-comments-api.mapbox.com/api/v1/users/name/' + encodeURIComponent(user);

  request(url, function (error, response, body) {
    // Pass the error back to the callee.
    if (error) return callback(error, undefined);
    else return callback(null, JSON.parse(body));
  });
}

function waterFeatureByNewUser(newVersion, oldVersion, callback) {
  // What is the number of changesets of a user to be considered a new user?
  var MINIMUM_CHANGESET_COUNT = 10;

  if (!newVersion || newVersion.properties['osm:version'] !== 1) return callback(null, {});

  if (isWaterFeature(newVersion)) {
    var user = newVersion.properties['osm:user'];

    getUserDetails(user, function (error, userDetails) {
      // Return back from the compare function with no results.
      if (error) return callback(null, {});

      if (userDetails['changeset_count'] <= MINIMUM_CHANGESET_COUNT) {
        return callback(null, {'result:water_feature_by_new_user': true});
      } else {
        return callback(null, {});
      }
    });
  } else {
    return callback(null, {});
  }
}
