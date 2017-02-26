'use strict';

module.exports = modifiedPlaceWikidata;

function modifiedPlaceWikidata(newVersion, oldVersion, callback) {
  if (!newVersion || !newVersion.properties) return callback(null, {});
  if (!oldVersion || !oldVersion.properties) return callback(null, {});
  // Assumption: Place features with edited wikidata tag need to flagged
  // Target: Finding suspicious edits that mistag wikidata value
  //This comparator will only look at modifications to Wikidata tags to features with place tag.


  // This if condition handles for new additions of place tag for features that have wikidata tag
  if (!(oldVersion.properties.hasOwnProperty('place')) && 'wikidata' in newVersion.properties && 'place' in newVersion.properties) {
    return callback(null, {
      'result:modifiedPlaceWikidata': true
    });
  }
  // Handles when a place feature is given a new wikidata tag
  if ('place' in oldVersion.properties && !(oldVersion.properties.hasOwnProperty('wikidata')) && 'place' in newVersion.properties && 'wikidata' in newVersion.properties) {
    return callback(null, {
      'result:modifiedPlaceWikidata': true
    });

  }
  // Handles when wikidata tag is deleted for place features
  if ('place' in oldVersion.properties && 'wikidata' in oldVersion.properties && 'place' in newVersion.properties && !(newVersion.properties.hasOwnProperty('wikidata'))) {
    return callback(null, {
      'result:modifiedPlaceWikidata': true
    });
  }
  // Handles modifications to wikidata tag for features with place tag
  if ('wikidata' in oldVersion.properties && 'wikidata' in newVersion.properties && 'place' in oldVersion.properties && 'place' in newVersion.properties) {
    if (oldVersion.properties.wikidata !== newVersion.properties.wikidata) {
      return callback(null, {
        'result:modifiedPlaceWikidata': true
      });
    }
  }
  return callback(null, {});
}
