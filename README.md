# Compare-GeoJSON


[![Circle CI](https://circleci.com/gh/mapbox/compare-geojson.svg?style=svg)](https://circleci.com/gh/mapbox/compare-geojson)


Compare functions take as inputs the following:

1. `oldVersion` - GeoJSON of the feature's old version
2. `newVersion` - GeoJSON of the feature's new version
3. `callback` - A function to call after processing.

Compare functions output the following:

1. `error` - Error if any during processing or `null`.
2. `result` - Object containing key value pairs representing findings of the compare function or an empty object.


A sample compare function would look something like this:

```
function checkPlaceRemoval(newVersion, oldVersion, callback) {
    var oldProps = oldVersion.properties;
    var newProps = newVersion.properties;
    var result = {};
    if (oldProps.hasOwnProperty('place') && !newProps.hasOwnProperty('place')) {
        result['result:place_removed'] = true;
    }
    return callback(null, result);
}
```
