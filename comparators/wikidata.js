'use strict';

module.exports = wikidata;

function wikidata(newVersion, oldVersion, callback) {

  if (!newVersion || !newVersion.properties) return callback(null, {});
  if (!oldVersion || !oldVersion.properties) return callback(null, {});

  var wikidata = 'wikidata';
  if (wikidata in oldVersion.properties && !(wikidata in newVersion.properties)) {
    return callback(null, {
      'result:wikidata_deleted': true
    });
  }

  return callback(null, {});
}
