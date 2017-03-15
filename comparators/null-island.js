'use strict';

var turfInside = require('turf-inside');
var bboxPolygon = require('turf-bbox-polygon');
var centroid = require('turf-centroid');

module.exports = nullIsland;

function nullIsland(newVersion, oldVersion, callback) {
  if (!newVersion || !newVersion.hasOwnProperty('geometry') || newVersion['geometry'] === null) {
    return callback(null, {});
  }
  var polygon = bboxPolygon([-6.722814455240666, -5.174241507358232, 6.570950888668989, 5.045358293553775]);
  var center = centroid(newVersion);
  var inside = turfInside(center, polygon);

  callback(null, {
    'result:null_island': inside
  });
}
