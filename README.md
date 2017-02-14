# Parse-on-Bluemix Overview

[![Greenkeeper badge](https://badges.greenkeeper.io/ibm-cds-labs/parse-on-bluemix.svg)](https://greenkeeper.io/)

Parse, the application framework, is shortly to retire. You can still run Parse applications yourself thanks to the open-sourced [Parse Server](https://github.com/ParsePlatform/parse-server). This project gives you some simple starter code that lets you run the Parse Server on Bluemix. You can add a MongoDB service from Compose as the app's storage layer.

## Application Requirements

* Bluemix Node.js Runtime
* Compose.io MongoDB service

## Running the app on Bluemix

The fastest way to deploy this application to Bluemix is to click the Deploy to Bluemix button below.

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy)

Once deployed:

* Sign up for an account at [Compose.io](https://www.compose.io/) and provision a MongoDB service
* Add a "MongoDB by Compose" service to your app in the Bluemix Dashboard
* Configure the "MongoDB by Compose" service by adding the credentials of your Compose MongoDB service into the Bluemix Dashboard

**Don't have a Bluemix account?** If you haven't already, you'll be prompted to sign up for a Bluemix account when you click the button.  Sign up, verify your email address, then return here and click the the **Deploy to Bluemix** button again. Your new credentials let you deploy to the platform and also to code online with Bluemix and Git. If you have questions about working in Bluemix, find answers in the [Bluemix Docs](https://www.ng.bluemix.net/docs/).

## Environment Variables

### Required
`APP_ID`
`MASTER_KEY`
`PARSE_MOUNT`
`CLOUD_CODE_MAIN`
`HTTPS`

### Optional
`DATABASE_URI`
`FILE_KEY`
`CLIENT_KEY`
`JS_KEY`
`REST_KEY`
`DOTNET_KEY`
`ALLOW_CLIENT_CLASS_CREATION`
`ENABLE_ANONYMOUS_USERS`
`OAUTH`
`FACEBOOK_APP_IDS`

### Privacy Notice

The Simple Search Service web application includes code to track deployments to Bluemix and other Cloud Foundry platforms. The following information is sent to a [Deployment Tracker](https://github.com/IBM-Bluemix/cf-deployment-tracker-service) service on each deployment:

* Application Name (`application_name`)
* Space ID (`space_id`)
* Application Version (`application_version`)
* Application URIs (`application_uris`)

This data is collected from the `VCAP_APPLICATION` environment variable in IBM Bluemix and other Cloud Foundry platforms. This data is used by IBM to track metrics around deployments of sample applications to IBM Bluemix. Only deployments of sample applications that include code to ping the Deployment Tracker service will be tracked.

### Disabling Deployment Tracking

For manual deploys, deployment tracking can be disabled by removing `require("cf-deployment-tracker-client").track();` from the end of the `app.js` main server file.

#### License

Copyright 2016 IBM Cloud Data Services

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
