'use strict';
var queue = require('queue-async');
var compareGeometry = require('../comparators/compare_geometry');
var compareTag = require('../comparators/compare_tag');
var placeSignificant = require('../comparators/place_significant');
var userChangesets = require('../comparators/user_changesets');
var countTag = require('../comparators/count_tag');
var deleteCreate = require('../comparators/delete_create');
var landmark = require('../comparators/landmark.js');
var cityDeleted = require('../comparators/city_deleted');
var compareProperties = require('../comparators/compare_properties');
var compareGeometries = require('../comparators/compare_geometries');
var highwayDeleted = require('../comparators/highway_deleted');


var extend = require('util')._extend;

/**
* Runs all compare functions defined as comparators and calls a callback with a results object.
*
* @param {Object} newVersion - GeoJSON for new version of feature
* @param {Object} oldVersion - GeoJSON for old version of feature
* @param {compareAllCallback} callback - callback that is called with results object
*/
var compareAll = function(newVersion, oldVersion, callback) {
  var q = queue(4);
  var comparators = [
    compareGeometry,
    compareTag,
    countTag,
    placeSignificant,
    userChangesets,
    deleteCreate,
    landmark,
    cityDeleted,
    compareProperties,
    compareGeometries,
    highwayDeleted
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
