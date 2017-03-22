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
  'major_lake_changed': require('./comparators/major-lake-modified'),
  'pokemon_footway': require('./comparators/pokemon-footway'),
  'place_edited': require('./comparators/place-edited'),
  'major_name_modification': require('./comparators/major-name-modification'),
  'wikidata_wikipedia_tag_deleted': require('./comparators/wikidata_wikipedia_tag_deleted'),
  'null_island': require('./comparators/null-island'),
  'pokemon_edits': require('./comparators/pokemon_edits'),
  'dragged_highway_waterway': require('./comparators/dragged_highway_waterway'),
  'added_place': require('./comparators/added_place'),
  'modified_place_wikidata': require('./comparators/modified-place-wikidata'),
  'osm_landmarks': require('./comparators/osm-landmarks'),
  'modifiedMonument': require('./comparators/modifiedMonument'),
  'invalid_tag_combination': require('./comparators/invalid-tag-combination'),
  'water_feature_by_new_user': require('./comparators/water-feature-by-new-user')
};
