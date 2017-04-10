'use strict';

var sqlite = require('sqlite3');
var turfCentroid = require('turf-centroid');
var join = require('path').join;

/**
* Checks for existence of feature in a local SQLite database of wikipedia landmarks and when the feature exists, calls back with a result of the wikipedia score.
* @param {object} newVersion Features new version in GeoJSON.
* @param {object} oldVersion Features old version in GeoJSON.
* @param {Function} callback called with (error, result).
* @returns {undefined} calls callback.
*/
function landmark_score(newVersion, oldVersion, callback) {

  var cfVersion = 2;
  var db = new sqlite.Database(join(__dirname, '..', 'landmarks.spatialite'));
  var result = {'result:landmark_score': false};

  // This should probably run through both?
  var theVersion = [newVersion, oldVersion].filter(function (v) {
    return v && 'properties' in v && (v.properties.wikipedia || v.properties.wikidata);
  });

  if (theVersion.length === 0) {
    db.close();
    return callback(null, result);
  }
  theVersion = theVersion[0];

  var query, args, query1, args1;
  if (theVersion.properties['wikidata'] && theVersion.properties['osm:version'] > 10) {
    // If there's a `wikidata` tag we can search for the wikidata ID (`qid` in the database) directly
    query = 'SELECT score FROM mb_landmark WHERE qid=? LIMIT 1;';
    args = [theVersion.properties['wikidata']];

    db.get(query, args, function(err, record) {
      if (err) {
        db.close();
        return callback(err);
      }

      if (record) {
        result = {'result:landmark_score': true};
      }
      db.close();
      callback(null, result);
    });
  } else if (theVersion.properties['wikipedia'] && theVersion.properties['osm:version'] > 10) {
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
        result = {'result:landmark_score': true};
      }
      db.close();
      callback(null, result);
    });
  } else {
    db.close();
    return callback(null, result);
  }
}

module.exports = landmark_score;
