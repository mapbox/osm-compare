'use strict';
module.exports = placeEdited;
var _ = require('lodash');


/*
- If a feature has these tags
    - place=city
    - place=town
    - place=suburb

- Any of the following are true:
  - The feature is deleted **or**
  - The feature is added **or**
  - The feature geometry moves **or**
  - One of the feature's `name*` tags changes or is removed
*/
function placeEdited(newVersion, oldVersion) {
  var result = {'result:place_edited': false};
  var isDeleted = !newVersion;
  var isAdded = !oldVersion;
  var isPlace, geometryChanged, nameChanged;
  if (isAdded) {
    isPlace = getIsPlace(newVersion);
  } else if (isDeleted) {
    isPlace = getIsPlace(oldVersion);
  } else {
    isPlace = getIsPlace(newVersion) || getIsPlace(oldVersion);
  }
  if (!isPlace) {
    return result;
  }
  geometryChanged = getGeometryChanged(newVersion, oldVersion);
  nameChanged = getNameChanged(newVersion, oldVersion);
  if (isPlace && (isDeleted || isAdded || geometryChanged || nameChanged)) {
    // One could set the value to something more specific rather than 'true'
    return {
      'result:place_edited': true
    };
  } else {
    return result;
  }
}

function getIsPlace(geojson) {
  var placeValues = [
    'city',
    'town',
    'suburb'
  ];
  return geojson.properties &&
    geojson.properties.place &&
    placeValues.indexOf(geojson.properties.place) !== -1;

}

function getGeometryChanged(newVersion, oldVersion) {
  if (!newVersion || !oldVersion) {
    return false;
  }
  var oldGeom = oldVersion.geometry;
  var newGeom = newVersion.geometry;

  //FIXME: one may want to do a centroid / distance calc with turf
  return !_.isEqual(oldGeom, newGeom);
}

function getNameChanged(newVersion, oldVersion) {
  if (!newVersion || !oldVersion) {
    return false;
  }
  var nameChanged = false;
  var newProps = newVersion.properties;
  var oldProps = oldVersion.properties;
  var uniqueKeys = _.uniq(_.keys(newProps).concat(_.keys(oldProps)));
  for (var i = 0; i < uniqueKeys.length; i++) {
    var key = uniqueKeys[i];
    if (_.startsWith(key, 'name')) {
      if (!newProps.hasOwnProperty(key) || oldProps.hasOwnProperty(key)) {
        nameChanged = true; // a name tag was deleted
        break;
      }
      if (oldProps.hasOwnProperty(key) && oldProps[key] !== newProps[key]) {
        nameChanged = true;
        break;
      }
    }
  }
  return nameChanged;
}
