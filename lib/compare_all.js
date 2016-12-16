'use strict';
var queue = require('queue-async');
var landmarkScore = require('../comparators/landmark_score.js');
var nameModified = require('../comparators/name_modified.js');
var disputedBorderTagChanged = require('../comparators/disputed-border-tag-changed.js');
var disputedBorderDeleted = require('../comparators/disputed-border-deleted.js');
var invalidHighwayTags = require('../comparators/invalid-highway-tags.js');
var largeBuilding = require('../comparators/large-building.js');
var majorRoadChanged = require('../comparators/major_road_changed.js');

var extend = require('util')._extend;

/**
* Runs all compare functions defined as comparators and calls a callback with a results object.
* @param {Object} newVersion - GeoJSON for new version of feature
* @param {Object} oldVersion - GeoJSON for old version of feature
* @param {compareAllCallback} callback - callback that is called with results object
* @returns {Object} Result from all compare functions.
*/
var compareAll = function(newVersion, oldVersion, callback) {
  var q = queue(4);
  var comparators = [
    landmarkScore,
    nameModified,
    disputedBorderTagChanged,
    disputedBorderDeleted,
    invalidHighwayTags,
    largeBuilding,
    majorRoadChanged
  ];
  comparators.forEach(function(comparator) {
    q.defer(comparator, newVersion, oldVersion);
  });
  q.awaitAll(function(err, results) {
    if (err) {
      callback(err);
    }

    callback(err, results.reduce(function(problems, result) {
      return extend(problems, result);
    }, {}));
  });
};

/**
* @callback compareAllCallback
* @param {Error} error - error, if any, else null
* @param {Object} result - object containing all result keys as returns from compare functions
*/

module.exports = compareAll;
