'use strict';

var lowZoomFeatures = {
  disputed: ['yes'],
  admin_level: [3, 2],

  natural: ['water', 'wood'],
  waterway: ['riverbank'],
  boundary: ['disputed', 'national_park'],
  highway: ['motorway', 'trunk'],
  place: ['continent', 'ocean', 'sea', 'country', 'state', 'city'],
  aeroway: ['aerodrome'],
  landuse: ['reservoir']
};

module.exports = lowZoomFeatures;
