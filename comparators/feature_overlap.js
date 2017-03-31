'use strict';

var featureCollection = require('../lib/feature-collection');
var area = require('turf-area');
var intersect  = require('turf-intersect');
var cover = require('tile-cover');

var limits = {
  min_zoom: 16,
  max_zoom: 16
};

module.exports = feature_overlap;

function feature_overlap(newVersion, oldVersion, callback) {
  var result = {};
  if (newVersion && newVersion.geometry) {
    var tiles = cover.tiles(newVersion['geometry'], limits);
    featureCollection(tiles, function (err, result) {
      if (err)
        return callback(err);
      var overlaps = getOverLappingFeatures(newVersion, result);
      return callback(null, {'result:feature_overlap': overlaps.length});
    });
  } else {
    return callback(null, {});
  }
}

function getOverLappingFeatures(incomingFeature, featureCollections) {
  var overlaps = [];
  if (featureCollections) {
    featureCollections.forEach(function (featureCollection) {
      featureCollection.features.forEach(function (feature) {
        var intersection = intersect(incomingFeature, feature);
        if (intersection) {
          if (area(intersection) > 0) {
            overlaps.push(feature);
          }
        }
      });
    });
  }
  return overlaps;
}
