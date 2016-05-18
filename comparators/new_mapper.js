'use strict';

module.exports = new_mapper;

/** Identify if a user is a new mapper on OpenStreetMap.
* @param {object} newVersion New version of a feature in GeoJSON.
* @param {object} oldVersion Old version of a feature in GeoJSON.
* @param {function} callback Called with (error, result).
* @returns {undefined} calls callback.
*/
function new_mapper(newVersion, oldVersion, callback) {

  var cfVersion = 2;

  /*
  User IDs on OpenStreetMap are in serial order.
  Our friend 'vidhatri' is a mapper since March 18, 2016 and has a user ID of 3725157.
  So, using this as a reference, a mapper is considered 'new mapper' if the user ID is less than 'vidhatri'.
  Else, the mapper is not a 'new mapper'.
  */

  // We don't need the oldVersion of the feature for this compare function.
  if (!newVersion) {
    return callback(null, {});
  }

  var vidhatri = 3725157;
  var uid = newVersion.properties ? newVersion.properties['osm:uid'] : newVersion['uid'];
  var result = {'result:new_mapper': {
    'cfVersion': cfVersion,
    'newMapper': uid > vidhatri
  }};
  callback(null, result);
}
