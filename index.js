'use strict';

module.exports = {
  'landmark_score': require('./comparators/landmark_score'),
  'name_modified': require('./comparators/name_modified'),
  'disputed-border-tag-changed': require('./comparators/disputed-border-tag-changed'),
  'disputed-border-deleted': require('./comparators/disputed-border-deleted'),
  'invalid-highway-tags': require('./comparators/invalid-highway-tags'),
  'large-building': require('./comparators/large-building'),
  'major_road_changed': require('./comparators/major_road_changed')
};
