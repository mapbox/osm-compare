'use strict';

var request = require('request');

module.exports = nameUnmatchesWithWikidata;

function getWikidataName(feature, id) {
  if (
    feature.hasOwnProperty('entities') &&
    feature['entities'].hasOwnProperty(id) &&
    feature['entities'][id].hasOwnProperty(['labels']) &&
    feature['entities'][id]['labels'].hasOwnProperty('en')
  )
    return feature['entities'][id]['labels']['en']['value'];
  else
    return undefined;
}

function getWikidataAliasNames(feature, id) {
  var names = [];
  if (
    feature.hasOwnProperty('entities') &&
    feature['entities'].hasOwnProperty(id) &&
    feature['entities'][id].hasOwnProperty(['aliases']) &&
    feature['entities'][id]['aliases'].hasOwnProperty('en')
  ) {
    var aliases = feature['entities'][id]['aliases']['en'];
    for (var i = 0; i < aliases.length; i++) {
      names.push(aliases[i]['value']);
    }
  }
  return names;
}

function nameUnmatchesWithWikidata(newVersion, oldVersion, callback) {
  if (newVersion.deleted) return callback(null, false);

  // Check if feature is newly created.
  if (newVersion.properties['osm:version'] !== 1) {
    if (
      !oldVersion ||
      newVersion.properties['name'] === oldVersion.properties['name']
    )
      return callback(null, false);
  }

  if (
    newVersion.properties.hasOwnProperty('wikidata') &&
    newVersion.properties.hasOwnProperty('name')
  ) {
    var osmName = newVersion.properties['name'];
    var wikidataID = newVersion.properties['wikidata'];
    var url = 'https://www.wikidata.org/w/api.php?action=wbgetentities&ids=' +
      wikidataID +
      '&format=json';

    request(url, function(error, response, body) {
      if (!error && response && response.statusCode === 200) {
        var wikidataFeature = JSON.parse(body);
        var wikidataName = getWikidataName(wikidataFeature, wikidataID);
        var wikidataAliasNames = getWikidataAliasNames(
          wikidataFeature,
          wikidataID
        );

        if (
          osmName !== wikidataName && wikidataAliasNames.indexOf(osmName) === -1
        )
          return callback(null, {
            'result:name_unmatches_with_wikidata': true
          });
      }
      return callback(null, false);
    });
  } else {
    return callback(null, false);
  }
}
