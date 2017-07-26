'use strict';

var turfDistance = require('turf-distance');
var turfCentroid = require('turf-centroid');
module.exports = wikidataDistanceWithOsm;

function wikidataDistanceWithOsm(newVersion) {
  if (
    newVersion.properties.place &&
    newVersion.properties['wikidata:claims:P625:longitude'] &&
    newVersion.properties['wikidata:claims:P625:latitude'] &&
    newVersion.geometry
  ) {
    var wikiFeature = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [
          newVersion.properties['wikidata:claims:P625:longitude'],
          newVersion.properties['wikidata:claims:P625:latitude']
        ]
      }
    };
    var distance = turfDistance(
      turfCentroid(newVersion),
      wikiFeature,
      'kilometres'
    );
    if (distance > 1) {
      return {'result:wikidata_distance_with_osm': distance};
    }
  }
  return false;
}
