'use strict';

module.exports = {
  'landmark-score': require('./comparators/landmark-score'),
  'disputed-border-tag-changed': require('./comparators/disputed-border-tag-changed'),
  'disputed-border-deleted': require('./comparators/disputed-border-deleted'),
  'invalid-highway-tags': require('./comparators/invalid-highway-tags'),
  'large-building': require('./comparators/large-building'),
  'major-road-changed': require('./comparators/major-road-changed'),
  'path-road-changed': require('./comparators/path-road-changed'),
  'major-lake-modified': require('./comparators/major-lake-modified'),
  'pokemon-footway': require('./comparators/pokemon-footway'),
  'place-edited': require('./comparators/place-edited'),
  'major-name-modification': require('./comparators/major-name-modification'),
  'wikidata-wikipedia-tag-deleted': require('./comparators/wikidata-wikipedia-tag-deleted'),
  'null-island': require('./comparators/null-island'),
  'pokemon-edits': require('./comparators/pokemon-edits'),
  'dragged-highway-waterway': require('./comparators/dragged-highway-waterway'),
  'added-place': require('./comparators/added-place'),
  'modified-place-wikidata': require('./comparators/modified-place-wikidata'),
  'osm-landmarks': require('./comparators/osm-landmarks'),
  'modified-monument': require('./comparators/modified-monument'),
  'invalid-tag-combination': require('./comparators/invalid-tag-combination'),
  'water-feature-by-new-user': require('./comparators/water-feature-by-new-user'),
  'common-tag-values': require('./comparators/common-tag-values.js')
};
