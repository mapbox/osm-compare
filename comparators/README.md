# List of comparators

### added-website

Reports when a `website` tag has been added, deleted or modified in a feature.

### disputed-border-deleted

Reports when the geometry or tags of a feature with `disputed` tag, is deleted.

### disputed-border-tag-changed

Reports when a feature with `disputed` tag has been modified .

### invalid-highway-tags

Reports when new version of a feature contains value of `highway` tag not present in a given list of valid highway tags.

### landmark_score

Reports when either of wikidata or wikipedia tag is present in a feature (old version or new version). It also looks for presence of wikidata or wikipedia entity in database `landmarks.spatialite`.

### large-building

Reports area when a feature is a building with area > 1500 sq. meter.

### major-lake-modified

Reports when a relation belonging to a set of major lakes is added, modified or deleted. It sets an escalation property in the report.

### major_road_changed

Reports when a road belonging to one of the major roads listed in compare-function is modified or deleted.

### name_modified

Reports when name tag (any language) is added, modified or deleted.

### path_road_changed

Reports when a path road is added or modified.

### pokemon-footway

Reports when a new footway is created. It sets an escalation property in the report.
