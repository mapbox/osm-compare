'use strict';

module.exports = wikidata_wikipedia_tag_deleted;

function wikidata_wikipedia_tag_deleted(newVersion, oldVersion) {
  var result = {'result:wikidata_wikipedia_tag_deleted': false};
  if (!newVersion || !newVersion.properties) return result;
  if (!oldVersion || !oldVersion.properties) return result;

  if (('wikidata' in oldVersion.properties && !('wikidata' in newVersion.properties)) ||
     ('wikipedia' in oldVersion.properties && !('wikipedia' in newVersion.properties))) {
    return {
      'result:wikidata_wikipedia_tag_deleted': true
    };
  }

  return result;
}
