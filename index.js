'use strict';

module.exports = {
  'cityDeleted': require('./comparators/city-deleted'),
  'geometryTransformation': require('./comparators/geometry-transformation'),
  'compare_geometry': require('./comparators/compare_geometry'),
  'compare_tag': require('./comparators/compare_tag'),
  'place_significant': require('./comparators/place_significant'),
  'user_changesets': require('./comparators/user_changesets'),
  'count_tag': require('./comparators/count_tag'),
  'delete_create': require('./comparators/delete_create'),
  'landmark_score': require('./comparators/landmark_score'),
  'city_deleted': require('./comparators/city_deleted'),
  'compare_properties': require('./comparators/compare_properties'),
  'compare_geometries': require('./comparators/compare_geometries'),
  'highway_deleted': require('./comparators/highway_deleted'),
  'new_mapper': require('./comparators/new_mapper'),
  'feature_version': require('./comparators/feature_version'),
  'uncommon_tags': require('./comparators/uncommon_tags'),
  'low_zoom_features': require('./comparators/low_zoom_features'),
  'user_blocks': require('./comparators/user_blocks')
};
