'use strict';

module.exports = {
  'landmark_score': require('./comparators/landmark_score'),
  'name_modified': require('./comparators/name_modified'),
  'disputed_border_tag_changed': require('./comparators/disputed-border-tag-changed'),
  'disputed_border_deleted': require('./comparators/disputed-border-deleted'),
  'invalid_highway_tags': require('./comparators/invalid-highway-tags'),
  'large_building': require('./comparators/large-building'),
  'major_road_changed': require('./comparators/major_road_changed'),
  'path_road_changed': require('./comparators/path_road_changed'),
  'place_edited': require('./comparators/place-edited')
};
