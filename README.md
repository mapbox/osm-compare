# osm-compare


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

```sh
# Format of compare function result where value can be primary data types or objects
{
    'result:comparator_name': value
}

# Format of compare function if no result, (default)
{
    'result:comparator_name': {}
}

```


### How do I create a new compare function?
* Clone this repository with `git clone https://github.com/mapbox/compare-geojson`
* `cd compare-geojson`
* `npm install`
* Check if all tests pass before making your changes with `npm test`
* Create a new test fixture in the directory `tests/fixtures/`
* Create a new compare function in the directory `comparators/` (check comparators/example.js for format)
* Test your new compare function with `npm test`
* Add your new comparator to `index.js`
* Push to a new branch on Github and create a Pull Request

### How do I test a single compare function against a new fixture?
* `cd compare-geojson/tests/`
* Create new fixture file in `tests/fixtures/` folder (check tests/fixtures/example.json for format)
* Test your fixture with `node test_compare_function.js fixtures/example.json`


### How do I build an npm package?
- We use [Semantic Versioning Specification](http://semver.org/) for versioning releases.
- Create an appropriate version of the npm package with `npm version [major|minor|patch]`.
- Push the package tag commit with `git push --tags`
- [Publish the NPM package](https://www.npmjs.com/package/compare-geojson) with `npm publish`
