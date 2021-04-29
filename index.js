'use strict';

var wrapsync = require('./lib/wrapsync');

module.exports = {
  disputed_border_tag_changed: wrapsync(
    require('./comparators/disputed_border_tag_changed')
  ),
  disputed_border_deleted: wrapsync(
    require('./comparators/disputed_border_deleted')
  ),
  invalid_highway_tags: wrapsync(require('./comparators/invalid_highway_tags')),
  large_building: wrapsync(require('./comparators/large_building')),
  major_road_changed: wrapsync(require('./comparators/major_road_changed')),
  path_road_changed: wrapsync(require('./comparators/path_road_changed')),
  major_lake_modified: wrapsync(require('./comparators/major_lake_modified')),
  place_edited: wrapsync(require('./comparators/place_edited')),
  major_name_modification: wrapsync(
    require('./comparators/major_name_modification')
  ),
  wikidata_wikipedia_tag_deleted: wrapsync(
    require('./comparators/wikidata_wikipedia_tag_deleted')
  ),
  null_island: wrapsync(require('./comparators/null_island')),
  pokemon_edits: wrapsync(require('./comparators/pokemon_edits')),
  dragged_highway_waterway: wrapsync(
    require('./comparators/dragged_highway_waterway')
  ),
  added_place: wrapsync(require('./comparators/added_place')),
  modified_place_wikidata: wrapsync(
    require('./comparators/modified_place_wikidata')
  ),
  modified_monument: wrapsync(require('./comparators/modified_monument')),
  modified_survey_point: wrapsync(
    require('./comparators/modified_survey_point')
  ),
  invalid_tag_combination: require('./comparators/invalid_tag_combination'),
  water_feature_by_new_user: require('./comparators/water_feature_by_new_user'),
  common_tag_values: wrapsync(require('./comparators/common_tag_values.js')),
  missing_primary_tag: wrapsync(
    require('./comparators/missing_primary_tag.js')
  ),
  example: require('./comparators/example.js'),
  added_website: wrapsync(require('./comparators/added_website.js')),
  wikidata_distance_with_osm: wrapsync(
    require('./comparators/wikidata_distance_with_osm.js')
  ),
  name_unmatches_with_wikidata: require('./comparators/name_unmatches_with_wikidata.js'),
  name_modified: wrapsync(require('./comparators/name_modified.js')),
  very_long_name: wrapsync(require('./comparators/very_long_name.js')),
  osm_landmarks: require('./comparators/osm_landmarks.js'),
  invalid_tag_modification: require('./comparators/invalid_tag_modification'),
  invalid_name: require('./comparators/invalid_name'),
  feature_overlap: require('./comparators/feature_overlap.js'),
  wrong_turn_restriction: wrapsync(
    require('./comparators/wrong_turn_restriction')
  ),
  rare_critical_feature_created: wrapsync(
    require('./comparators/rare_critical_feature_created')
  ),
  deprecated_construction_proposal_tag: wrapsync(
    require('./comparators/deprecated_construction_proposal_tag.js')
  ),
  irrelevant_tags_on_highway: wrapsync(
    require('./comparators/irrelevant_tags_on_highway.js')
  ),
  motorway_trunk_geometry_changed: wrapsync(
    require('./comparators/motorway_trunk_geometry_changed.js')
  ),
  name_ref_changes: wrapsync(require('./comparators/name_ref_changes.js')),
  destination_ref_changed: wrapsync(
    require('./comparators/destination_ref_changed.js')
  ),
  place_name_changed: wrapsync(require('./comparators/place_name_changed.js')),
  new_user: wrapsync(require('./comparators/new_user.js')),
  new_user_motorway: wrapsync(require('./comparators/new_user_motorway.js')),
  new_user_footway: wrapsync(require('./comparators/new_user_footway.js')),
  new_user_water: wrapsync(require('./comparators/new_user_water.js')),
  new_user_motorway_deleted: wrapsync(
    require('./comparators/new_user_motorway_deleted.js')
  ),
  new_user_large_building: wrapsync(
    require('./comparators/new_user_large_building.js')
  ),
  straight_segment: wrapsync(require('./comparators/straight_segment.js')),
  place_feature_deleted: wrapsync(
    require('./comparators/place_feature_deleted.js')
  ),
  impossible_angles: wrapsync(require('./comparators/impossible_angles.js')),
  place_type_change: wrapsync(require('./comparators/place_type_change.js')),
  profanity: wrapsync(require('./comparators/profanity.js')),
  new_user_park: wrapsync(require('./comparators/new_user_park.js')),
  new_user_pokemon_nest: wrapsync(
    require('./comparators/new_user_pokemon_nest.js')
  ),
  deleted_address: wrapsync(require('./comparators/deleted_address.js'))
};
