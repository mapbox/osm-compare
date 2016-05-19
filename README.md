# Compare-GeoJSON


[![Circle CI](https://circleci.com/gh/mapbox/compare-geojson.svg?style=svg)](https://circleci.com/gh/mapbox/compare-geojson)


Compare functions take as inputs the following:

1. `oldVersion` - GeoJSON of the feature's old version
2. `newVersion` - GeoJSON of the feature's new version
3. `callback` - A function to call after processing.

Compare functions output the following:

1. `error` - Error if any during processing or `null`.
2. `result` - Object containing key value pairs representing findings of the compare function or an empty object.


#### Versioning
The version of the compare function is returned as part of the result as `cfVersion`. Every time a compare function is modified, we increment the `cfVersion`.

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

### How do I create a compare function?
1. Clone this repository with `git clone https://github.com/mapbox/compare-geojson`
2. `cd compare-geojson`
3. `npm install`
4. Create a new JSON fixture in the directory `tests/fixtures/` in the format below:
```
{
    "compareFunction": "< compare function name >",
    "fixtures": [
        {
            "description": "Description of this test",
            "expectedResult": < Result of the compare function>,
            "newVersion": {
                < GeoJSON of new version of the feature >
            },
            "oldVersion": {
                < GeoJSON of old version of the feature >
            }
        }
    ]
}
```
5. Write your compare function in the directory `comparators` in the format explained above.
6. Test your new compare function with `npm test`.
