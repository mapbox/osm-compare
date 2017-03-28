'use strict';

var wrapsync = require('./lib/wrapsync');

module.exports = {
  'landmark_score': require('./comparators/landmark_score'),
  'disputed_border_tag_changed': require('./comparators/disputed_border_tag_changed'),
  'disputed_border_deleted': require('./comparators/disputed_border_deleted'),
  'invalid_highway_tags': require('./comparators/invalid_highway_tags'),
  'large_building': wrapsync(require('./comparators/large_building')),
  'major_road_changed': require('./comparators/major_road_changed'),
  'path_road_changed': require('./comparators/path_road_changed'),
  'major_lake_modified': wrapsync(require('./comparators/major_lake_modified')),
  'pokemon_footway': require('./comparators/pokemon_footway'),
  'place_edited': require('./comparators/place_edited'),
  'major_name_modification': require('./comparators/major_name_modification'),
  'wikidata_wikipedia_tag_deleted': wrapsync(require('./comparators/wikidata_wikipedia_tag_deleted')),
  'null_island': require('./comparators/null_island'),
  'pokemon_edits': wrapsync(require('./comparators/pokemon_edits')),
  'dragged_highway_waterway': wrapsync(require('./comparators/dragged_highway_waterway')),
  'added_place': wrapsync(require('./comparators/added_place')),
  'modified_place_wikidata': wrapsync(require('./comparators/modified_place_wikidata')),
  'modified_monument': wrapsync(require('./comparators/modified_monument')),
  'invalid_tag_combination': require('./comparators/invalid_tag_combination'),
  'water_feature_by_new_user': require('./comparators/water_feature_by_new_user'),
  'common_tag_values': require('./comparators/common_tag_values.js'),
  'example': require('./comparators/example.js'),
  'added_website': require('./comparators/added_website.js'),
  'name_matches_to_wikidata': require('./comparators/name_matches_to_wikidata.js'),
  'name_modified': require('./comparators/name_modified.js'),
  'osm_landmarks': require('./comparators/osm_landmarks.js')
};
