### Lets make a compare function which detects features with version greater than 25 being deleted in OSM.

##Steps
- [ ] Clone the repository [osm-compare](https://github.com/mapbox/osm-compare)

  `git clone git@github.com:mapbox/osm-compare.git`
  
  `cd osm-compare`
  
  `npm install`
  
- [ ] Switch to a new branch

  `git checkout -b branch_name`
  
- [ ] Add a new file in comparators/

  `touch comparators/comparator_name.js`
  
- [ ] Write your comparator here. Sample comparator looks like following:

```
'use strict';
module.exports = significant_feature;

function significant_feature(newVersion, oldVersion) {

  if (newVersion.deleted && !oldVersion) {
    // None of old version or new Version present
    return false;
  }
  if (newVersion && oldVersion) {
    // Both new Version and old Version are present, which indicates feature has been modified
    /*
      Comparing the tags
      return {
        message: custom message which can be sent (optional)
        'result:comparator_name' = value;
      }
     */
  } else if (newVersion && !oldVersion) {
    // Only new Version is present, which indicates feature has been added
    /*
      Comparing the tags
      Creating a result object
     */
  } else if (newVersion.deleted && oldVersion) {
    // Only old Version is present, which indicates feature has been deleted
    /*
      Comparing the tags
      Creating a result object
     */
  }
  /* return default result
  return {
    message: custom message which can be sent (optional)
    'result:comparator_name' = value;
  }*/
}
```
  [Example compare function](https://github.com/mapbox/osm-compare/blob/master/docs/example.js)
   
- [ ] Now to test if our comparator is working all well, we need fixtures. A Fixture is a json object which contains the old version json and new Version json of any feature. Let's write some of them to test our compare function. Also note that we should have a good number(Atleast 3-4) of fixtures to test all the end cases. Add a new json file in tests/fixtures

  `touch tests/fixtures/comparator_name.json`

- [ ] A fixture looks something like following:

  ```
  {
    "compareFunction": "comparator_name",
    "fixtures": [
    {
      "description": "Description of this fixture",
      "newVersion": {
      },
      "oldVersion": {
      },
      "expectedResult": {
      }
    }
    ]
  }
  ```
  
  [Example compare function test](https://github.com/mapbox/osm-compare/blob/master/docs/example.json)
  
  To add new Version and old Version one can follow: 
  - Query api-dynamosm: https://jzvqzn73ca.execute-api.us-east-1.amazonaws.com/api/feature/way/430124248?version=4
    Get both the old and new version json.
    
- [ ] Run the test.

  `node tests/test_compare_function.js tests/fixtures/comparator_name.json`
  
  This will return the fixture description along with the result returned by the comparator. Check whether if this returns result as expected.
  
- [ ] Export the compare function here: https://github.com/mapbox/osm-compare/blob/master/index.js

  