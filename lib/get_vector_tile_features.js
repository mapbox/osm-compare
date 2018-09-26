'use strict';

var d3 = require('d3-queue');
var vt2geojson = require('@mapbox/vt2geojson');
var attempt = require('attempt');

var retrieveTileData = function(layers, x, y, z, callback) {
  var url = 'http://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/' +
    z +
    '/' +
    x +
    '/' +
    y +
    '.mvt?access_token=pk.eyJ1IjoiYW1pc2hhIiwiYSI6ImNqaHVibzk5ZjBpaGQzcW9uanRrZG1kdTMifQ.YfJF2hRjuxM3FnRghgV7yw';
  vt2geojson(
    {
      uri: url,
      layer: layers
    },
    function(err, result) {
      if (err) return callback(err, null);
      return callback(null, result);
    }
  );
};

var attempt_retrieveTileData = function(layers, x, y, z, callback) {
  attempt(
    {retries: 5},
    function(attempts) {
      if (attempts > 0) console.log('#', attempts);
      retrieveTileData(layers, x, y, z, this);
    },
    function(err, result) {
      if (err) return callback(err, null);
      else return callback(null, result);
    }
  );
};

var getVectorTileFeatures = function(tiles, layers, callback) {
  var queue = d3.queue(5);
  tiles.forEach(function(tile) {
    queue.defer(attempt_retrieveTileData, layers, tile[0], tile[1], tile[2]);
  });
  queue.awaitAll(function(err, results) {
    if (err) return callback(err, null);
    return callback(null, results);
  });
};

module.exports = getVectorTileFeatures;
