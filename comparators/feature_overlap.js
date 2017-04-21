'use strict';

var featureCollection = require('../lib/get_vector_tile_features');
var area = require('turf-area');
var intersect = require('turf-intersect');
var cover = require('tile-cover');
var featureFilter = require('feature-filter');
var arrayIntersection = require('lodash.intersection');

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

var filterFeatures = featureFilter(featuresJSON);
var excludeFeaturesFilter = featureFilter(excludeFeaturesJSON);

function feature_overlap(newVersion, oldVersion, callback) {
  var result = {};
  if (
    newVersion &&
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

    var tiles = cover.tiles(newVersion['geometry'], limits);
    var layers = layersMapping[featurePrimaryTag[0]];

    featureCollection(tiles, layers, function(err, result) {
      if (err) return callback(err);
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
              var intersection = intersect(relationMember, feature);
              if (intersection) {
                if (area(intersection) > 0) {
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
          var intersection = intersect(incomingFeature, feature);
          if (intersection) {
            if (area(intersection) > 0) {
              overlaps.push(feature);
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
  'trunk'
];
var allowedFeatureClass = [
  'primary',
  'secondary',
  'tertiary',
  'motorway',
  'trunk'
];
var landuseFeaturesClass = [
  'agriculture',
  'cemetery',
  'glacier',
  'grass',
  'hospital',
  'industrial',
  'parking',
  'piste',
  'pitch',
  'rock',
  'sand',
  'school',
  'scrub',
  'wood',
  'aboriginal_lands'
];

function isExcluded(properties) {
  var underground = properties.underground ? properties.underground : false;
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
