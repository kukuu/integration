# Feature Toggling

Implementing feature toggles or feature flags allows you to control the release of new features in your application without the need for code deployments. This can help you gradually roll out features to different user groups or enable/disable features as needed. Below, I'll demonstrate how to implement feature toggles using the launchdarkly-node-server-sdk library as an example.

By using LaunchDarkly, you can manage your feature toggles remotely without the need to modify the application code or redeploy it. This approach allows you to experiment with new features and safely roll them out to a subset of users before enabling them for all users. Additionally, you can quickly disable features in case of issues or performance concerns.

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

// Feature toggle key
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
