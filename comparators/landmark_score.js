'use strict';

var sqlite = require('sqlite3');
var turfCentroid = require('turf-centroid');

/**
* Checks for existence of feature in a local SQLite database of wikipedia landmarks.
* If the feature exists, calls back with a result of the wikipedia score. eg:
* {'result:wikipedia_score': 100}
*/

function landmark_score(newVersion, oldVersion, callback) {
  var db = new sqlite.Database('landmarks.spatialite');
  var result = {};

  // This should probably run through both?
  var theVersion = [newVersion, oldVersion].filter(function (v) {
    return v && 'properties' in v && (v.properties.wikipedia || v.properties.wikidata);
  });

  if (theVersion.length === 0) {
    db.close();
    return callback(null, {});
  }
  theVersion = theVersion[0];

  var query, args;
  if (theVersion.properties['wikidata']) {
    // If there's a `wikidata` tag we can search for the wikidata ID (`qid` in the database) directly
    query = 'SELECT score FROM landmarks WHERE qid=? LIMIT 1;';
    args = [theVersion.properties['wikidata']];

  } else if (theVersion.properties['wikipedia']) {
    // If there's a `wikipedia` tag try to match on label + location
    //if (theVersion.geometry.type != 'node') {
    //  theVersion.geometry = turfCentroid(theVersion).geometry;
    //}

    query = 'SELECT score FROM landmarks WHERE label=? LIMIT 1;';
    args = [theVersion.properties['wikipedia']];
  }

  db.get(query, args, function(err, record) {
    if (err) {
      db.close();
      return callback(err);
    }

    if (record) {
      result['result:wikipedia_score'] = record.score;
    }

    db.close();
    callback(null, result);
  });

}

module.exports = landmark_score;
