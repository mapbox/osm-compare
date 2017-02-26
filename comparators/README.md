# List of comparators

### added-website

Reports when a `website` tag is added, deleted or modified in a feature.

### added-place

Reports when `place` : ['city', 'town', 'country'] tag is added in a feature (old / new).

### disputed-border-deleted

Reports when a feature with `disputed` tag, is deleted.

### disputed-border-tag-changed

Reports when a feature with `disputed` tag has been modified .

### dragged_highway_waterway

Reports when a highway/waterway feature contains internode distance > 10 km.

### invalid-highway-tags

Reports when new version of a feature contains value of `highway` tag not present in a given list of valid highway tags.

### landmark_score

Reports when wikidata / wikipedia tag of a feature(old / new) version is present in landmarks.spatialite database . Considers only version > 10.

### large-building

Reports area when a feature is a building with area > 1500 sq. meter.

### major-lake-modified

Reports when a relation belonging to a set of major lakes is added, modified or deleted. It sets an escalation property in the report.

### major-name-modification

Reports when `name` tag is modified for a feature having wikidata / wikipedia tag.  Escalates when name modification > 50% and version > 10

### major_road_changed

Reports when a road belonging to one of the major roads listed in compare-function is modified or deleted. Considers only version > 10.

### name_modified

Reports when name tag (any language) is added, modified or deleted.

### null-island

Reports when any addition or modification happens in null island.

### path_road_changed

Reports when a path road is added or when `highway` tag is modified for a path road.

### place_edited

Reports when a feature has `place` tag as one of these - ['city', 'town', 'village', 'suburb', 'hamlet', 'island'] and feature is deleted, added , having geometry change or having any `name*` tags changed or removed

### pokemon-footway

Reports when a new footway is created by a new user(2016, 11, 23).

### pokemon_edits

Reports when a feature having any of these tags ['natural', 'water', 'highway', 'building', 'leisure', 'tourism'] has pokename (Poke|mon|(go | stop | gym)) as `name*` tag.

### wikidata_wikipedia_tag_deleted

Reports when any of wikidata / wikipedia tag is deleted.

### modified-place-wikidata

Reports when `wikidata` tag is added, deleted or modified for a place type feature. It also reports when `place` tag is added to a feature which has `wikidata` tag in new version.
