# Feature Toggling

Implementing feature toggles or feature flags allows you to control the release of new features in your application without the need for code deployments. This can help you gradually roll out features to different user groups or enable/disable features as needed. Below, I'll demonstrate how to implement feature toggles using the launchdarkly-node-server-sdk library as an example.

This is a very progressive and useful tool in optimisation, refinements, recommendation and improvements during service delivery and support in Management Consultancy.

By using LaunchDarkly, you can manage your feature toggles remotely without the need to modify the application code or redeploy it. This approach allows you to experiment with new features and safely roll them out to a subset of users/segmentation before enabling them for all users. Additionally, you can quickly disable features in case of issues or performance concerns.

## Steps:

1. Install the LaunchDarkly SDK:

First, install the LaunchDarkly SDK in your Node.js project:

```
npm install launchdarkly-node-server-sdk --save

```

2. Initialize the LaunchDarkly Client:
   
Create a module to initialize the LaunchDarkly client with your environment-specific SDK key. The SDK key is provided by the LaunchDarkly dashboard when you create a new project.

launchdarkly.js:

```
const LDClient = require('launchdarkly-node-server-sdk');

const ldClient = LDClient.initialize('your_sdk_key');

module.exports = ldClient;

```

3. Create a Feature Toggle:
   
In your application code, use the LaunchDarkly client to check the value of a feature toggle and conditionally enable or disable a specific feature.

app.js:

```
const ldClient = require('./launchdarkly');

// Feature toggle key. Store this as part of an environmental variable. Dont expose in the application code.
const MY_FEATURE_TOGGLE_KEY = 'my-feature-toggle';

// Default value when the toggle is not found
const DEFAULT_TOGGLE_VALUE = false;

async function enableMyFeatureToggle(userId) {
  try {
    // Evaluate the feature toggle for the given user
    const isEnabled = await ldClient.variation(MY_FEATURE_TOGGLE_KEY, { key: userId }, DEFAULT_TOGGLE_VALUE);

    if (isEnabled) {
      // Your feature implementation code here
      console.log('My feature is enabled for user:', userId);
      // Implement the new feature behaviour
    } else {
      // Implement the old behaviour or a fallback
      console.log('My feature is disabled for user:', userId);
    }
  } catch (error) {
    // Handle error if needed
    console.error('Error evaluating feature toggle:', error.message);
  }
}

// Call the function with a user identifier (e.g., user ID)
enableMyFeatureToggle('user123');

```

4. Update Feature Toggles in LaunchDarkly Dashboard:

 Go to your LaunchDarkly dashboard and create a new feature toggle with the key my-feature-toggle. You can then control the behaviour of the feature by toggling it on or off for different users or user segments.



### Using API
https://github.com/kukuu/integration/blob/main/FF-using-API.md

### Request Template sample

https://apidocs.launchdarkly.com/tag/Feature-flags#operation/getFeatureFlag

```
import fetch from 'node-fetch';

async function run() {
  const projectKey = 'YOUR_projectKey_PARAMETER';
  const featureFlagKey = 'YOUR_featureFlagKey_PARAMETER';
  const resp = await fetch(
    `https://app.launchdarkly.com/api/v2/flags/${projectKey}/${featureFlagKey}`,
    {
      method: 'GET',
      headers: {
        Authorization: 'YOUR_API_KEY_HERE'
      }
    }
  );

  const data = await resp.text();
  console.log(data);
}

run();
```
Sample 

```
import fetch from 'node-fetch';

async function run() {
  const projectKey = 'YOUR_projectKey_PARAMETER';
  const resp = await fetch(
    `https://app.launchdarkly.com/api/v2/flags/${projectKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'YOUR_API_KEY_HERE'
      },
      body: JSON.stringify({
        clientSideAvailability: {
          usingEnvironmentId: true,
          usingMobileKey: true
        },
        key: 'flag-key-123abc',
        name: 'My Flag'
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();
```

Response sample

```
{
  "name": "My Flag",
  "kind": "boolean",
  "description": "This flag controls the example widgets",
  "key": "flag-key-123abc",
  "_version": 1,
  "creationDate": 0,
  "includeInSnippet": true,
  "clientSideAvailability": {
    "usingMobileKey": true,
    "usingEnvironmentId": true
  },
  "variations": [
    {
      "_id": "e432f62b-55f6-49dd-a02f-eb24acf39d05",
      "value": true
    },
    {
      "_id": "a00bf58d-d252-476c-b915-15a74becacb4",
      "value": false
    }
  ],
  "temporary": true,
  "tags": [
    "example-tag"
  ],
  "_links": {
    "parent": {
      "href": "/api/v2/flags/my-project",
      "type": "application/json"
    },
    "self": {
      "href": "/api/v2/flags/my-project/my-flag",
      "type": "application/json"
    }
  },
  "maintainerId": "569f183514f4432160000007",
  "_maintainer": {
    "_links": {
      "self": {
        "href": "/api/v2/members/569f183514f4432160000007",
        "type": "application/json"
      }
    },
    "_id": "569f183514f4432160000007",
    "firstName": "Ariel",
    "lastName": "Flores",
    "role": "admin",
    "email": "ariel@acme.com"
  },
  "maintainerTeamKey": "team-1",
  "_maintainerTeam": {
    "key": "team-key-123abc",
    "name": "Example team",
    "_links": {
      "parent": {
        "href": "/api/v2/teams",
        "type": "application/json"
      },
      "roles": {
        "href": "/api/v2/teams/example-team/roles",
        "type": "application/json"
      },
      "self": {
        "href": "/api/v2/teams/example-team",
        "type": "application/json"
      }
    }
  },
  "goalIds": [],
  "experiments": {
    "baselineIdx": 0,
    "items": [
      {
        "metricKey": "my-metric",
        "_metric": {
          "experimentCount": 0,
          "_id": "5902deadbeef667524a01290",
          "key": "metric-key-123abc",
          "name": "My metric",
          "kind": "custom",
          "_attachedFlagCount": 0,
          "_links": {
            "parent": {
              "href": "/api/v2/metrics/my-project",
              "type": "application/json"
            },
            "self": {
              "href": "/api/v2/metrics/my-project/my-metric",
              "type": "application/json"
            }
          },
          "_site": {
            "href": "string",
            "type": "string"
          },
          "_access": {
            "denied": [
              {
                "action": null,
                "reason": null
              }
            ],
            "allowed": [
              {
                "action": null,
                "reason": null
              }
            ]
          },
          "tags": [],
          "_creationDate": 0,
          "lastModified": {
            "date": "2021-08-05T19:46:31.148082Z"
          },
          "maintainerId": "569fdeadbeef1644facecafe",
          "_maintainer": {
            "_links": {
              "self": {
                "href": "/api/v2/members/569f183514f4432160000007",
                "type": "application/json"
              }
            },
            "_id": "569f183514f4432160000007",
            "firstName": "Ariel",
            "lastName": "Flores",
            "role": "admin",
            "email": "ariel@acme.com"
          },
          "description": "string",
          "isNumeric": true,
          "successCriteria": "HigherThanBaseline",
          "unit": "string",
          "eventKey": "string",
          "randomizationUnits": [
            "user"
          ]
        },
        "environments": [
          "production",
          "test",
          "my-environment"
        ],
        "_environmentSettings": {
          "property1": {
            "startDate": 0,
            "stopDate": 0,
            "enabledPeriods": [
              {
                "startDate": null,
                "stopDate": null
              }
            ]
          },
          "property2": {
            "startDate": 0,
            "stopDate": 0,
            "enabledPeriods": [
              {
                "startDate": null,
                "stopDate": null
              }
            ]
          }
        }
      }
    ]
  },
  "customProperties": {
    "property1": {
      "name": "Jira issues",
      "value": [
        "is-123",
        "is-456"
      ]
    },
    "property2": {
      "name": "Jira issues",
      "value": [
        "is-123",
        "is-456"
      ]
    }
  },
  "archived": false,
  "archivedDate": 0,
  "defaults": {
    "onVariation": 0,
    "offVariation": 1
  },
  "environments": {
    "my-environment": {
      "_environmentName": "My Environment",
      "_site": {
        "href": "/default/my-environment/features/client-side-flag",
        "type": "text/html"
      },
      "_summary": {
        "prerequisites": 0,
        "variations": {
          "0": {
            "contextTargets": 1,
            "isFallthrough": true,
            "nullRules": 0,
            "rules": 0,
            "targets": 1
          },
          "1": {
            "isOff": true,
            "nullRules": 0,
            "rules": 0,
            "targets": 0
          }
        }
      },
      "archived": false,
      "contextTargets": [
        {
          "contextKind": "device",
          "values": [
            "device-key-123abc"
          ],
          "variation": 0
        }
      ],
      "fallthrough": {
        "variation": 0
      },
      "lastModified": 1627071171347,
      "offVariation": 1,
      "on": false,
      "prerequisites": [],
      "rules": [],
      "salt": "61eddeadbeef4da1facecafe3a60a397",
      "sel": "810edeadbeef4844facecafe438f2999492",
      "targets": [
        {
          "contextKind": "user",
          "values": [
            "user-key-123abc"
          ],
          "variation": 0
        }
      ],
      "trackEvents": false,
      "trackEventsFallthrough": false,
      "version": 1
    }
  }
}

```
## Resources:

 - https://launchdarkly.com/
 - https://docs.launchdarkly.com/home?_gl=1*19b5n9h*_gcl_aw*R0NMLjE2OTIxOTcxMTUuQ2p3S0NBanc1X0dtQmhCSUVpd0E1UVNNeEhHTlNDcWdJUkJwVFFZNDlRR3lNLWo0dTFDbXE4X1ZyNzBqdlBSS29zUTlFV0pHOWdSYm94b0NYNkFRQXZEX0J3RQ..*_gcl_au*MTc3NTg3MzE4My4xNjkyMTk2OTA5
 - https://launchdarkly.com/feature-flags-javascript/
 - https://app.launchdarkly.com/default/test/features
