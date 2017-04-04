'use strict';

var fs = require('fs');
var join = require('path').join;

module.exports = commonTagValues;

var primaryTags = [
  'aerialway', 'aeroway', 'amenity', 'barrier', 'boundary', 'building', 'craft', 'emergency',
  'geological', 'highway', 'historic', 'landuse', 'leisure', 'man_made', 'military', 'natural',
  'office', 'places', 'power', 'public_transport', 'railway', 'route', 'shop', 'sport',
  'tourism', 'waterway'
];

function commonTagValues(newVersion, oldVersion) {
  var result = {};

  if (!newVersion || !newVersion.properties)
    return result;

  var primary_tag_present = false;
  result['result:commonTagValues'] = true;

  for (var i = primaryTags.length - 1; i >= 0; i--) {
    var tag = primaryTags[i];

    if (tag in newVersion.properties) {
      primary_tag_present = true;
      var data = fs.readFileSync(join(__dirname, '..', 'common_tag_values/' + tag + '.json'));
      var commonValues = JSON.parse(data.toString()).data;
      var value = newVersion.properties[tag];
      for (var j = commonValues.length - 1; j >= 0; j--) {
        if (commonValues[j]['value'] === value && !(commonValues[j]['fraction'] <= 0.0 && commonValues[j]['in_wiki'] === false)) {
          result = {};
        }
      }
    }
  }
  if (!primary_tag_present)
    result = {};
  return result;
}
