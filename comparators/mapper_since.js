'use strict';

module.exports = mapper_since;

/** Identify if a user is a new mapper on OpenStreetMap.
* @param {object} newVersion New version of a feature in GeoJSON.
* @param {object} oldVersion Old version of a feature in GeoJSON.
* @param {function} callback Called with (error, result).
* @returns {undefined} calls callback.
*/
function mapper_since(newVersion, oldVersion, callback) {
  /*
  User IDs on OpenStreetMap are in serial order.
  Our friend 'nammala' is a mapper since December 25, 2015 and has a user ID of 3479270.
  So, using this as a reference, a mapper is considered 'new mapper' if the user ID is less than 'nammala'.
  Else, the mapper is not a 'new mapper'.
  */

  // We don't need the oldVersion of the feature for this compare function.
  if (!newVersion) {
    return callback(null, {});
  }

  var nammala = 3479270;
  var uid = newVersion.properties ? newVersion.properties['osm:uid'] : newVersion['uid'];
  var result = {'result:mapper_since': {
    'newMapper': uid > nammala
  }};
  callback(null, result);
}
