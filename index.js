'use strict';

var wrapsync = require('./lib/wrapsync');

module.exports = {
  'landmark_score': require('./comparators/landmark_score'),
  'disputed_border_tag_changed': require('./comparators/disputed-border-tag-changed'),
  'disputed_border_deleted': require('./comparators/disputed-border-deleted'),
  'invalid_highway_tags': require('./comparators/invalid-highway-tags'),
  'large_building': wrapsync(require('./comparators/large-building')),
  'major_road_changed': require('./comparators/major_road_changed'),
  'path_road_changed': require('./comparators/path_road_changed'),
  'major_lake_changed': wrapsync(require('./comparators/major-lake-modified')),
  'pokemon_footway': require('./comparators/pokemon-footway'),
  'place_edited': require('./comparators/place-edited'),
  'major_name_modification': require('./comparators/major-name-modification'),
  'wikidata_wikipedia_tag_deleted': wrapsync(require('./comparators/wikidata_wikipedia_tag_deleted')),
  'null_island': require('./comparators/null-island'),
  'pokemon_edits': wrapsync(require('./comparators/pokemon_edits')),
  'dragged_highway_waterway': require('./comparators/dragged_highway_waterway'),
  'added_place': wrapsync(require('./comparators/added_place')),
  'modified_place_wikidata': wrapsync(require('./comparators/modified-place-wikidata')),
  'osm_landmarks': require('./comparators/osm-landmarks'),
  'modifiedMonument': wrapsync(require('./comparators/modifiedMonument')),
  'invalid_tag_combination': require('./comparators/invalid-tag-combination'),
  'water_feature_by_new_user': require('./comparators/water-feature-by-new-user'),
  'commonTagValues': require('./comparators/common_tag_values.js'),
  'example': require('./comparators/example.js'),
  'addedWebsite': require('./comparators/added-website.js'),
  'name_matches_to_wikidata': require('./comparators/name-matches-to-wikidata.js'),
  'name_modified': require('./comparators/name_modified.js'),
  'osm_landmarks': require('./comparators/osm-landmarks.js')
};
