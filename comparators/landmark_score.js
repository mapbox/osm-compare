'use strict';

var sqlite = require('sqlite3');
var turfCentroid = require('turf-centroid');

/**
* Checks for existence of feature in a local SQLite database of wikipedia landmarks and when the feature exists, calls back with a result of the wikipedia score.
* @param {object} newVersion Features new version in GeoJSON.
* @param {object} oldVersion Features old version in GeoJSON.
* @param {Function} callback called with (error, result).
* @returns {undefined} calls callback.
*/
function landmark_score(newVersion, oldVersion, callback) {

  var cfVersion = 2;

  var db = new sqlite.Database('landmarks.spatialite');
  var result = {};
  result['result:landmark_score'] = {};

  // This should probably run through both?
  var theVersion = [newVersion, oldVersion].filter(function (v) {
    return v && 'properties' in v && (v.properties.wikipedia || v.properties.wikidata);
  });

  if (theVersion.length === 0) {
    db.close();
    return callback(null, {});
  }
  theVersion = theVersion[0];

  var query, args, query1, args1;
  if (theVersion.properties['wikidata']) {
    result['result:landmark_score']['wikidata'] = 1;
    // If there's a `wikidata` tag we can search for the wikidata ID (`qid` in the database) directly
    query = 'SELECT score FROM mb_landmark WHERE qid=? LIMIT 1;';
    args = [theVersion.properties['wikidata']];

    db.get(query, args, function(err, record) {
      if (err) {
        db.close();
        return callback(err);
      }

      if (record) {
        result['result:landmark_score']['cfVersion'] = cfVersion;
        result['result:landmark_score']['score'] = record.score;
        result['result:landmark_score']['DBwikidata'] = 1;
      }
      callback(null, result);
      db.close();
    });
  } else if (theVersion.properties['wikipedia']) {
    result['result:landmark_score']['wikipedia'] = 1;
    // If there's a `wikipedia` tag try to match on label + location
    //if (theVersion.geometry.type != 'node') {
    //  theVersion.geometry = turfCentroid(theVersion).geometry;
    //}

    query1 = 'SELECT score FROM mb_landmark WHERE label_en=? LIMIT 1;';
    args1 = [theVersion.properties['wikipedia'].slice(+3)];
    db.get(query1, args1, function(err, record) {
      if (err) {
        db.close();
        return callback(err);
      }

      if (record) {
        result['result:landmark_score']['DBwikipedia'] = 1;
        result['result:landmark_score']['score'] = record.score;
      }
      callback(null, result);
      db.close();
    });
  }
}

module.exports = landmark_score;
