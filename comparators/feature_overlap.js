'use strict';

var featureCollection = require('../lib/get_vector_tile_features');
var area = require('turf-area');
var intersect  = require('turf-intersect');
var cover = require('tile-cover');
var featureFilter = require('feature-filter');
var arrayIntersection = require('lodash.intersection');

var limits = {
  min_zoom: 16,
  max_zoom: 16
};

module.exports = feature_overlap;

var primaryTags = ['natural', 'highway', 'building'];

var featuresJSON = [
  'any',
  ['==', 'natural', 'water'],
  ['==', 'highway', 'primary'],
  ['==', 'highway', 'secondary'],
  ['==', 'highway', 'tertiary'],
  ['==', 'highway', 'trunk'],
  ['==', 'building', 'motorway'],
  ['==', 'building', 'yes']
];

var layersMapping = {
  'highway': ['water', 'building'],
  'natural': ['road', 'building'],
  'building': ['road', 'water']
};

var filterFeatures = featureFilter(featuresJSON);

function feature_overlap(newVersion, oldVersion, callback) {
  var result = {};
  if (newVersion && newVersion.geometry &&
      newVersion.properties &&
      filterFeatures(newVersion) &&
      newVersion['properties']['osm:version'] === 1) {

    var featurePrimaryTag = arrayIntersection(Object.keys(newVersion['properties']), primaryTags);
    if (featurePrimaryTag.length === 0) {
      return callback(null, false);
    }

    var tiles = cover.tiles(newVersion['geometry'], limits);
    var layers = layersMapping[featurePrimaryTag[0]];

    featureCollection(tiles, layers, function (err, result) {
      if (err)
        return callback(err);
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
    incomingFeature.properties.relations.forEach(function (relationMember) {
      relationMembers.push(Number(relationMember['properties']['ref']));
    });
    if (featureCollections) {
      incomingFeature.properties.relations.forEach(function (relationMember) {
        featureCollections.forEach(function (featureCollection) {
          featureCollection.features.forEach(function (feature) {
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
    featureCollections.forEach(function (featureCollection) {
      featureCollection.features.forEach(function (feature) {
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

function isExcluded(properties) {
  var underground = properties.underground ? properties.underground : false;
  var layer = properties.layer ? (properties.layer !== 0)  : false;
  return underground || layer;
}
