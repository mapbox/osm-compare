# List of comparators

### added-place

Reports when `place` : ['city', 'town', 'country'] tag is added in a feature (old / new).

### added-website

Reports when a `website` tag is added, deleted or modified in a feature.

### disputed-border-deleted

Reports when a feature with `disputed` tag, is deleted.

### disputed-border-tag-changed

Reports when a feature with `disputed` tag has been modified .

### dragged_highway_waterway

Reports when the new version of highway/waterway contains internode distance > 10 km.

### invalid-highway-tags

Reports when new version of a feature contains value of `highway` tag not present in a given list of valid highway tags.

### invalid_name

Report if a values of `name` or `name:*` for a feature have any profanity.

### invalid-tag-combination

Reports when a feature has two uncommon primary tag combinations. Ex: `0.06 %` of features with `building` also have `historic` tag.

### invalid-tag-modification

Reports when a feature's primary tag is modified between newVersion and oldVersion of the feature.

### landmark_score

Reports when wikidata / wikipedia tag of a feature(old / new) version is present in landmarks.spatialite database . Considers only version > 10.

### large-building

Reports area when a feature is a building with area > 1500 sq. meter.

### major-lake-modified

Reports when a relation belonging to a set of major lakes is added, modified or deleted. It sets an escalation property in the report.

### major-name-modification

Reports when `name` tag is modified > 50% and version > 10 for a feature having wikidata / wikipedia tag.

### major_road_changed

Reports when a road belonging to one of the major roads listed in compare-function is modified or deleted. Considers only version > 10.

### modified-place-wikidata

Reports when `wikidata` tag is added, deleted or modified for a place type feature. It also reports when `place` tag is added to a feature which has `wikidata` tag in new version.

### modified_survey_point

Detects `man_made=survey_point` deleted, moved or that lost its main tag

### name_modified _disabled_

Reports when name tag (any language) is added, modified or deleted.

### null-island

Reports when any addition or modification happens in null island.

### osm-landmarks

Reports when any feature in the [osm-landmarks list](https://github.com/osmlab/osm-landmarks) is edited.

### path_road_changed

Reports when a path road is added or when `highway` tag is modified for a path road.

### place_edited

Reports when a feature has `place` tag as one of these - ['city', 'town', 'village', 'suburb', 'hamlet', 'island'] and feature is deleted, added , having geometry change or having any `name*` tags changed or removed

### pokemon_edits

Reports when a feature having any of these tags ['natural', 'water', 'highway', 'building', 'leisure', 'tourism'] has pokename (Poke|mon|(go | stop | gym)) as `name*` tag.

### pokemon-footway

Reports when a new footway is created by a new user(2016, 11, 23).

### water-feature-by-new-user

Report when a new user creates a new water feature.

### wikidata_wikipedia_tag_deleted

Reports when any of wikidata / wikipedia tag is deleted.
