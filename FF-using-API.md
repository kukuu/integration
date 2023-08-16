# Using API to Generate FF instance

https://apidocs.launchdarkly.com/tag/Feature-flags/#operation/postFeatureFlag

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
