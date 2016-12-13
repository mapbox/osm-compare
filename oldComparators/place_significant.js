'use strict';

var significant_place = {
  'country': 100,
  'city': 30,
  'state': 50,
  'county': 30,
  'region': 50,
  'island': 30,
  'town': 15,
  'village': 5
};

/**
* Gives the feature a significance score based on its place tag and version.
* @param {object} newVersion Features new version in GeoJSON.
* @param {object} oldVersion Features old version in GeoJSON.
* @param {Function} callback called with (error, result).
* @returns {undefined} calls callback with significance score if score is greater than 0.
*/
function place_significant(newVersion, oldVersion, callback) {
  var score = Math.max.apply(Math, [newVersion, oldVersion].map(function(v) {
    if (v && v.properties && v.properties.place) {
      return significant_place[v.properties.place] * v.properties['osm:version'];
    }
    return 0;
  }));

  if (score > 0) {
    callback(null, {'result:significant_place': score});
  } else {
    callback(null, {});
  }
}

module.exports = place_significant;
