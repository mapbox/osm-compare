'use strict';

var d3 = require('d3-queue');
var vt2geojson = require('@mapbox/vt2geojson');

var retrieveTileData = function (x, y, z, callback) {
  var url = 'http://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/' + z + '/' + x + '/' + y + '.mvt?access_token=pk.eyJ1IjoiYW1pc2hhIiwiYSI6ImNpcWt1bWc4bjAzOXNmdG04bng4dHVhZ3EifQ.bJK6rpjNmiP3kW2pROdScg';
  vt2geojson({
    uri: url
  }, function (err, result) {
    if (err) return callback(err, null);
    return callback(null, result);
  });
};

var getAllTileFeatures = function (tiles, callback) {
  var queue = d3.queue(5);
  tiles.forEach(function (tile) {
    queue.defer(retrieveTileData, tile[0], tile[1], tile[2]);
  });
  queue.awaitAll(function (err, results) {
    if (err)
      return callback(err, null);
    return callback(null, results);
  });
};

module.exports = getAllTileFeatures;
