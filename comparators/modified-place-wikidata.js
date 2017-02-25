'use strict';

module.exports = modifiedPlaceWikidata;

function modifiedPlaceWikidata(newVersion, oldVersion, callback) {
  if (!newVersion || !newVersion.properties) return callback(null, {});
  if (!oldVersion || !oldVersion.properties) return callback(null, {});
  // Assumption: Modifications to wikidata tags of places need further verification as these are important
  // Target: Finding suspicious edits that mistag wikidata value
  //This comparator will only look at modifications to Wikidata tags to features with place tag.
  if ('wikidata' in oldVersion.properties && 'wikidata' in newVersion.properties && 'place' in oldVersion.properties && 'place' in newVersion.properties) {
    if (oldVersion.properties.wikidata !== newVersion.properties.wikidata) {
      return callback(null, {
        'result:modifiedPlaceWikidata': true
      });
    }
  }
  return callback(null, {});
}
