# Change Log


All notable changes to this project will be documented in this file. This project adheres to [Semantic Versioning](http://semver.org/).

## [9.4.1] - 2021-05-16
### Fixed
- Don't throw error if the user information is not available

### Updated
- tap library update to version 15.0.9

## [9.4.0] - 2021-04-29
### Updated
- Change compare functions that used the osm-comments-api to use only the user data available on the changeset
- Update queue and tap libs and update tests
- Move from Circle CI to Travis CI

## [8.3.0] - 2018-02-14
### Updated
* Changed `turn_restriction` function to detect only bad formatted ones.

### Added
* Function `very_long_name` to detect features with more than 80 chars in the name.

## [3.2.1] - 2016-05-23
### Fixed
* Corrected typo from `dirty_words` to `dirty_word`.

## [3.2.0] - 2016-05-23
### Update
* Version `dirty_word` and `priority_area` compare functions.

## [3.1.1] - 2016-05-20
### Added
* Export `dirty_word` and `priority_area` compare functions from the module.

## [3.1.0] - 2016-05-20
### Added
* `dirty_word` compare function to check for words in a feature's name.
* `priority_area` compare function to detect feature edits in priority areas.
* Script to convert `user_blocks.json` into `user_blocks.csv`
* Fixed code linting.

### Changed
* Update README with instructions about how to write a new compare function.

## [3.0.0] - 2016-05-18
### Changed
* Refactor `low_zoom_features`, `uncommon_tags`, `feature_version`, `new_mapper`, `compare_geometries`, `landmark` and `user_blocks` compare function with versioning.
* `landmark` compare function is now renamed to `landmark_score`
* Add versioning to README.

### Added
* `user_blocks` compare function to return number of OpenStreetMap blocks received by mapper.
* Script to download user blocks from OpenStreetMap.

## [2.3.1] - 2016-05-06
### Changed
* Rename compare function `infrequent_key_value` to `uncommon_tags` in module exports.

## [2.3.0] - 2016-05-06
### Added
* Script to download uncommon tags from TagInfo.

### Changed
* Update uncommon tags from TagInfo to `20` from `10`.
* Rename compare function `infrequent_key_value` to `uncommon_tags`.

## [2.2.0] - 2016-05-05
### Added
* `low_zoom_features` to detect edits to features visible at low zoom level.
* `new_mapper` to find edits by new mappers on OpenStreetMap.
* `feature_version` to detect version of features modified.

## [2.1.0] - 2016-05-03
### Added
* Add compare functions to module exports

## [2.0.0] - 2016-05-03
### Added
* `landmark` compare function to detect edits to important landmarks.

## [1.1.0] - 2016-04-29
### Added
* Code linting with ESLint.

### Changed
* Document compare functions with JSDoc.

## [1.0.0] - 2016-04-29
### Fixed
* `.DS_Store` bug fix for running tests.
* Common tests and fixtures for compare functions to check for errors.

## [0.1.1] - 2016-04-26
### Changed
* Add `compare_geometries` to module export.

## [0.1.0] - 2016-04-26
### Added
* `compare_geometries` compare function to monitor geometry transformations.
* Setup `Circle CI` for continuous integration.
* Setup `npm test` with `tape` with code coverage with `tap`.
* `package.json` to release as an NPM module.
* Initial version of README.
