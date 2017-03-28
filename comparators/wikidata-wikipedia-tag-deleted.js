'use strict';

module.exports = wikidata_wikipedia_tag_deleted;

function wikidata_wikipedia_tag_deleted(newVersion, oldVersion, callback) {

  if (!newVersion || !newVersion.properties) return callback(null, {});
  if (!oldVersion || !oldVersion.properties) return callback(null, {});

  if (('wikidata' in oldVersion.properties && !('wikidata' in newVersion.properties)) ||
     ('wikipedia' in oldVersion.properties && !('wikipedia' in newVersion.properties))) {
    return callback(null, {
      'result:wikidata-wikipedia-tag-deleted': true
    });
  }

  return callback(null, {});
}
