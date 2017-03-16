'use strict';

var request = require('request');

module.exports = nameMatchesToWikidata;

function getWikidataName(feature, id) {
    if (feature.hasOwnProperty('entities') &&
        feature['entities'].hasOwnProperty(id) &&
        feature['entities'][id].hasOwnProperty(['labels']) &&
        feature['entities'][id]['labels'].hasOwnProperty('en'))
        return feature['entities'][id]['labels']['en']['value'];
    else
        return undefined;
}

function nameMatchesToWikidata(newVersion, oldVersion, callback) {
  var result = {};

  if (!newVersion) return callback(null, result);

  if (newVersion.properties.hasOwnProperty('wikidata') && newVersion.properties.hasOwnProperty('name')) {

    var osmName = newVersion.properties['name'];
    var wikidataID = newVersion.properties['wikidata'];
    var url = 'https://www.wikidata.org/w/api.php?action=wbgetentities&ids=' + wikidataID + '&format=json';

    request(url, function (error, response, body) {
      if (!error && response && (response.statusCode === 200)) {
        var wikidataFeature = JSON.parse(body);
        var wikidataName = getWikidataName(wikidataFeature, wikidataID);
        if (osmName === wikidataName) return callback(null, {
          'result:name_matches_to_wikidata': false
        });
      }
      return callback(null, result);
    });
  } else {
    return callback(null, result);
  }
}
