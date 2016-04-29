'use strict';
var turfArea = require('turf-area');
var turfEnvelope = require('turf-envelope');

function getFeatureSize(feature) {
  if (!feature || !feature.geometry) {
    return 0;
  }
  var units = 'kilometers';
  var bbox = turfEnvelope(feature);
  var area = turfArea(bbox);
  return area;
}

function getPropertyValue(feature) {
  var minimumScore = 1;
  if (!feature || !feature.properties) {
    return minimumScore;
  }

  // The items are sorted in decendening order of priority. The first item in the list is the of highest priority.
  var prioritizedProperties = ['disputed', 'admin_level', 'natural', 'waterway', 'boundary', 'highway', 'place', 'aeroway', 'railway', 'ref'];
  for (var i = 0; i < prioritizedProperties.length; i++) {
    if (prioritizedProperties[i] in feature.properties) {
      return prioritizedProperties.length - prioritizedProperties.indexOf(prioritizedProperties[i]);
    }
  }
}

/**
* To flag significant tag changes to large features.
*/
function compare_properties(newVersion, oldVersion, callback) {
  // Calculate and return the value of propertyTransformation.
  var newFeatureSize = getFeatureSize(newVersion);
  var oldFeatureSize = getFeatureSize(oldVersion);

  var newPropertyValue = getPropertyValue(newVersion);
  var oldPropertyValue = getPropertyValue(oldVersion);

  var propertyDelta = newPropertyValue - oldPropertyValue;

  var version = newVersion.properties ? newVersion.properties['osm:version'] : newVersion.version;
  var propertyTransformation = propertyDelta ? propertyDelta * version : version;

  callback(null, {
    'result:compare_properties': {
      'propertyDelta': propertyDelta,
      'propertyTransformation': propertyTransformation
    }
  });
}

module.exports = compare_properties;
