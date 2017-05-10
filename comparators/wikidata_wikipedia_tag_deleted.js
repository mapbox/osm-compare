'use strict';

module.exports = wikidata_wikipedia_tag_deleted;

function wikidata_wikipedia_tag_deleted(newVersion, oldVersion) {
  if (newVersion.deleted || !newVersion.properties) return false;
  if (!oldVersion || !oldVersion.properties) return false;

  if (
    ('wikidata' in oldVersion.properties &&
      !('wikidata' in newVersion.properties)) ||
    ('wikipedia' in oldVersion.properties &&
      !('wikipedia' in newVersion.properties))
  ) {
    return {
      'result:wikidata_wikipedia_tag_deleted': true
    };
  }

  return false;
}
