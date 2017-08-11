'use strict';

var featureFilter = require('feature-filter');

module.exports = rareCriticalFeatureCreated;

var featuresJSON = [
  'any',
  ['==', 'place', 'country'],
  ['==', 'place', 'continent'],
  ['==', 'place', 'ocean'],
  ['==', 'place', 'sea'],
  ['==', 'natural', 'mountain_range'],
  ['==', 'aerodrome:type', 'public'],
  ['in', 'admin_level', 1, 2, 3, 4]
];

var filterFeatures = featureFilter(featuresJSON);

function rareCriticalFeatureCreated(newVersion, oldVersion, callback) {
  if (
    !newVersion.deleted &&
    newVersion['properties']['osm:version'] === 1 &&
    filterFeatures(newVersion)
  ) {
    return {
      message: 'Rare critical feature created',
      'result:rare_critical_feature_created': true
    };
  }
  return false;
}
