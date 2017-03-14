'use strict';

var sqlite = require('sqlite3');

module.exports = matchesToWikidata;

function matchesToWikidata(newVersion, oldVersion, callback) {
  var result = {};

  // If feature does not have a Wikidata tag, nothing to do.
  if (!newVersion.properties.hasOwnProperty('wikidata')) return callback(null, result);

  var db = new sqlite.Database('landmarks.spatialite');
  var query = 'SELECT score FROM mb_landmark WHERE qid=? LIMIT 1;';
  var args = [newVersion.properties['wikidata']];

  db.get(query, args, function(error, record) {
    // If error or feature not in local database, nothing to do.
    if (error || !record) {
      db.close();
      return callback(null, result);
    }
    db.close();
  });

  return callback(null, result);
}
