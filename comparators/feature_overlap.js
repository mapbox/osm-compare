'use strict';

var featureCollection = require('../lib/get_vector_tile_features');
var area = require('turf-area');
var intersect = require('turf-intersect');
var cover = require('tile-cover');
var featureFilter = require('feature-filter');
var arrayIntersection = require('lodash.intersection');
var difference = require('@turf/difference');
var buffer = require('@turf/buffer');

var limits = {
  min_zoom: 16,
  max_zoom: 16
};

module.exports = feature_overlap;

var primaryTags = ['natural', 'highway', 'building', 'leisure'];

var featuresJSON = [
  'any',
  ['==', 'natural', 'water'],
  ['==', 'highway', 'primary'],
  ['==', 'highway', 'secondary'],
  ['==', 'highway', 'tertiary'],
  ['==', 'highway', 'trunk'],
  ['==', 'building', 'motorway'],
  ['==', 'building', 'yes'],
  ['==', 'leisure', 'park']
];

var excludeFeaturesJSON = [
  'all',
  ['!has', 'layer'],
  ['!has', 'tunnel'],
  ['!has', 'bridge'],
  ['!has', 'covered'],
  ['!has', 'ford'],
  ['!==', 'location', 'underground'],
  ['!==', 'location', 'overground']
];

var layersMapping = {
  highway: ['water', 'building'],
  natural: ['road', 'building'],
  building: ['road', 'water'],
  leisure: ['road', 'building', 'landuse']
};

/*
  Both closed polygon
    1 : feature incoming overlaps completely the other feature
    0 : feature incoming overlaps some area with the other feature
    -1: feature incoming is completely inside the other feature
  One open and another closed way
    1 : Way is intersecting the other feature near the center
    0 : Way is intersecting the other feature near the edges
    -1 : Way is completely inside the other feature
*/

var Mapping = {
  highway: {
    water: [1, -1],
    building: [1, -1]
  },
  natural: {
    road: [1],
    building: [1, 0]
  },
  building: {
    road: [1],
    water: [1, 0, -1]
  },
  leisure: {
    road: [1],
    building: [1, 0],
    landuse: [1, 0]
  }
};

var filterFeatures = featureFilter(featuresJSON);
var excludeFeaturesFilter = featureFilter(excludeFeaturesJSON);

function feature_overlap(newVersion, oldVersion, callback) {
  var result = {};
  if (
    !newVersion.deleted &&
    newVersion.geometry &&
    newVersion.properties &&
    filterFeatures(newVersion) &&
    excludeFeaturesFilter(newVersion) &&
    newVersion['properties']['osm:version'] === 1
  ) {
    var featurePrimaryTag = arrayIntersection(
      Object.keys(newVersion['properties']),
      primaryTags
    );
    if (featurePrimaryTag.length === 0) {
      return callback(null, false);
    }

    if (
      newVersion['properties']['osm:type'] === 'relation' &&
      newVersion.properties.relations.length <= 0
    ) {
      return callback(null, false);
    }

    var tiles;
    try {
      tiles = cover.tiles(newVersion['geometry'], limits);
    } catch (err) {
      console.log(
        'Error caught',
        JSON.stringify(err),
        JSON.stringify(newVersion)
      );
      return callback(null, false);
    }

    var layers = layersMapping[featurePrimaryTag[0]];

    featureCollection(tiles, layers, function(err, result) {
      if (err) {
        console.log(JSON.stringify(newVersion), tiles, layers);
        return callback(err);
      }
      var overlaps = getOverLappingFeatures(newVersion, result);
      if (overlaps.length > 0)
        return callback(null, {'result:feature_overlap': overlaps.length});
      else
        return callback(null, false);
    });
  } else {
    return callback(null, false);
  }
}

function getOverLappingFeatures(incomingFeature, featureCollections) {
  var overlaps = [];
  var relationMembers = [];
  relationMembers.push(incomingFeature['properties']['osm:id']);
  if (incomingFeature['properties']['osm:type'] === 'relation') {
    incomingFeature.properties.relations.forEach(function(relationMember) {
      relationMembers.push(Number(relationMember['properties']['ref']));
    });
    if (featureCollections) {
      incomingFeature.properties.relations.forEach(function(relationMember) {
        featureCollections.forEach(function(featureCollection) {
          featureCollection.features.forEach(function(feature) {
            if (!isExcluded(feature.properties)) {
              var intersection;
              try {
                intersection = intersect(relationMember, feature);
              } catch (err) {
                console.log('Error caught', err);
              }
              if (intersection) {
                var areaIntersection = area(intersection);
                if (areaIntersection > 0) {
                  var diff;
                  try {
                    diff = difference(intersection, incomingFeature);
                  } catch (err) {
                    console.log('Error caught', err);
                  }
                  if (!diff) {
                    overlaps.push(feature);
                  }
                } else {
                  overlaps.push(feature);
                }
              }
            }
          });
        });
      });
    }
  } else if (featureCollections) {
    featureCollections.forEach(function(featureCollection) {
      featureCollection.features.forEach(function(feature) {
        if (!isExcluded(feature.properties)) {
          var incomingFeatureArea = area(incomingFeature);
          var featureArea = area(feature);
          var intersection;
          try {
            intersection = intersect(incomingFeature, feature);
          } catch (err) {
            console.log(err);
          }
          if (intersection) {
            if (incomingFeatureArea > 0 && featureArea > 0) {
              var incomingFeatureDiff, featureDiff;
              try {
                incomingFeatureDiff = difference(incomingFeature, intersection);
              } catch (err) {
                console.log(
                  'Error caught',
                  JSON.stringify(err),
                  JSON.stringify(incomingFeature)
                );
              }
              try {
                featureDiff = difference(feature, intersection);
              } catch (err) {
                console.log(
                  'Error caught',
                  JSON.stringify(err),
                  JSON.stringify(incomingFeature)
                );
              }
              if (incomingFeatureDiff && featureDiff) {
                var intersectionArea = area(intersection);
                if (
                  intersectionArea / incomingFeatureArea > 0.5 ||
                  intersectionArea / featureArea > 0.5
                ) {
                  overlaps.push(feature);
                }
              } else if (incomingFeatureDiff && !featureDiff) {
                overlaps.push(feature);
              }
            } else if (incomingFeatureArea > 0 && featureArea === 0) {
              var buffered = buffer(incomingFeature, -0.001);
              var bufferedIntersection;
              try {
                bufferedIntersection = intersect(buffered, feature);
              } catch (err) {
                console.log(
                  'Error caught',
                  JSON.stringify(err),
                  JSON.stringify(incomingFeature)
                );
              }
              if (bufferedIntersection) {
                overlaps.push(feature);
              }
            } else if (incomingFeatureArea === 0 && featureArea > 0) {
              var buffered1 = buffer(feature, -0.001);
              var bufferedIntersection1;
              try {
                bufferedIntersection1 = intersect(buffered1, incomingFeature);
              } catch (err) {
                console.log(
                  'Error caught',
                  JSON.stringify(err),
                  JSON.stringify(incomingFeature)
                );
              }
              if (bufferedIntersection1) {
                overlaps.push(feature);
              }
            }
          }
        }
      });
    });
  }
  return overlaps;
}

var allowedFeatureType = [
  'building',
  'primary',
  'secondary',
  'tertiary',
  'motorway',
  'trunk',
  'residential',
  'unclassified'
];
var allowedFeatureClass = [
  'primary',
  'secondary',
  'tertiary',
  'motorway',
  'trunk',
  'street'
];
var landuseFeaturesClass = [
  'agriculture',
  'cemetery',
  'glacier',
  'hospital',
  'industrial',
  'piste',
  'school',
  'wood',
  'aboriginal_lands'
];

function isExcluded(properties) {
  var underground = properties.underground
    ? properties.underground === 'true'
    : false;
  var layer = properties.layer ? properties.layer !== 0 : false;
  var structure = properties.structure
    ? properties.structure !== 'none'
    : false;
  var type = properties.type
    ? allowedFeatureType.indexOf(properties.type) === -1 &&
        landuseFeaturesClass.indexOf(properties.class) === -1
    : false;
  var featureClass = properties.class
    ? allowedFeatureClass.indexOf(properties.class) === -1 &&
        landuseFeaturesClass.indexOf(properties.class) === -1
    : false;
  return underground || layer || structure || type || featureClass;
}
