# Scope of current comparators

* **added-website**  : Reports true when a `website` tag has been added, deleted or modified in a feature.

* **disputed-border-deleted** : Reports true when a feature with `disputed` tag in it, is deleted.

* **disputed-border-tag-changed** : Reports true when a feature with `disputed` tag has been modified (Property / geometry).

* **invalid-highway-tags** : Reports true when new version of a feature contains a tag not present in a given list of valid highway tags.

* **landmark_score** : Reports true when either of wikidata / wikipedia tag is present in a feature (old version / new version). It also looks for presence of wikidata / wikipedia entity in database `landmarks.spatialite`.

* **large-building** : Reports area when a feature is a building with area > 1500 sq. meter.

* **major-lake-modified** : Reports true when a relation belonging to a set of major lakes is added, modified or deleted. It also sends a pagerduty for the detection.

* **major_road_changed** : Reports true when a road belonging to one of the major roads listed in compare-function is modified or deleted.

* **name_modified** : Reports true when name tag (any language) is added / modified / deleted.

* **path_road_changed** : Reports true when a path road is added /modified.

* **pokemon-footway** : Reports true when a new footway is created. It also sends a pagerduty for the detection.
