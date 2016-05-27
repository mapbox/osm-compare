# Compare-GeoJSON


[![Circle CI](https://circleci.com/gh/mapbox/compare-geojson.svg?style=svg)](https://circleci.com/gh/mapbox/compare-geojson)


Compare functions are small atomic functions that are designed identify what changed during a feature edit on OpenStreetMap. Compare functions can be broadly split up into two categories:
1. Property (tags) checking compare function
2. Geometry checking compare functions

Compare functions take as inputs the following:

1. `oldVersion` - GeoJSON of the feature's old version
2. `newVersion` - GeoJSON of the feature's new version
3. `callback` - A function to call after processing.

Compare functions output the following:

1. `error` - Error if any during processing or `null`.
2. `result` - Object containing key value pairs representing findings of the compare function or an empty object.


#### Versioning
The version of the compare function is returned as part of the result as `cfVersion`. Every time a compare function is modified, we increment the value of `cfVersion`.

A sample compare function would look something like this:

```
function place_removed(newVersion, oldVersion, callback) {

  var cfVersion = 2;

  var oldProps = oldVersion.properties;
  var newProps = newVersion.properties;
  var placeRemoved = false;
  if (oldProps.hasOwnProperty('place') && !newProps.hasOwnProperty('place')) {
    placeRemoved = true;
  }
  return callback(null, {'result:place_removed': {
    'cfVersion': cfVersion,
    'placeRemoved': placeRemoved
  }});
}
```

### How do I create a new compare function?
* Clone this repository with `git clone https://github.com/mapbox/compare-geojson`
* `cd compare-geojson`
* `npm install`
* Fetch landmarks database with `curl -s https://s3.amazonaws.com/vandalism-dynamosm-support/landmarks.spatialite -o landmarks.spatialite`
* Check if all tests pass before making your changes with `npm test`
* Create a new test fixture in the directory `tests/fixtures/`
* Create a new compare function in the directory `comparators/`
* Test your new compare function with `npm test`


### How do I test a single compare function against a new fixture?
* `cd compare-geojson/tests/`
* Create new fixture file in `tests/fixtures/` folder (check other fixtures for format).
* Update name of compare function you want to run the fixture against.
* Test your fixture with `node test_compare_function.js fixtures/new_mapper.json`


### How do I build an npm package?
- Add your new comparator to `index.js`
- We use [Semantic Versioning Specification](http://semver.org/) for versioning releases.
- Create an appropriate version of the npm package with `npm version [major|minor|patch]`.
- Push the package tag commit with `git push --tags`
- [Publish the NPM package](https://www.npmjs.com/package/compare-geojson) with `npm publish`
