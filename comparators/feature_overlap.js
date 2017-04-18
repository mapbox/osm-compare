'use strict';

var featureCollection = require('../lib/get_vector_tile_features');
var area = require('turf-area');
var intersect  = require('turf-intersect');
var cover = require('tile-cover');
var featureFilter = require('feature-filter');

var limits = {
  min_zoom: 16,
  max_zoom: 16
};

module.exports = feature_overlap;

var featuresJSON = [
  'any',
  ['has', 'natural'],
  ['has', 'highway'],
  ['has', 'building']
];

var filterFeatures = featureFilter(featuresJSON);

function feature_overlap(newVersion, oldVersion, callback) {
  var result = {};
  if (newVersion && newVersion.geometry &&
      newVersion.properties &&
      filterFeatures(newVersion) &&
      newVersion['properties']['osm:version'] === 1) {
    var tiles = cover.tiles(newVersion['geometry'], limits);
    featureCollection(tiles, function (err, result) {
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
            var intersection = intersect(relationMember, feature);
            if (intersection) {
              if (area(intersection) > 0) {
                var id = feature.id.toString();
                id = parseInt(id.substring(0, id.length - 1));
                if (relationMembers.indexOf(id) === -1) {
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
        var intersection = intersect(incomingFeature, feature);
        if (intersection) {
          if (area(intersection) > 0) {
            var id = feature.id.toString();
            id = parseInt(id.substring(0, id.length - 1));
            if (relationMembers.indexOf(id) === -1) {
              overlaps.push(feature);
            }
          }
        }
      });
    });
  }
  return overlaps;
}
