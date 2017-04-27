'use strict';

var featureFilter = require('feature-filter');

module.exports = rareCriticalFeatureCreated;

var featuresJSON = [
  'any',
  ['==', 'boundary', 'administrative'],
  ['==', 'place', 'country'],
  ['==', 'place', 'continent'],
  ['==', 'place', 'ocean'],
  ['==', 'place', 'sea'],
  ['==', 'natural', 'peak'],
  ['==', 'natural', 'mountain_range'],
  ['==', 'aeroway', 'aerodrome']
];

var filterFeatures = featureFilter(featuresJSON);

function rareCriticalFeatureCreated(newVersion, oldVersion, callback) {
  if (
    !newVersion.deleted &&
    newVersion['properties']['osm:version'] === 1 &&
    filterFeatures(newVersion)
  )
    return {'result:rare_critical_feature_created': true};
  return false;
}
