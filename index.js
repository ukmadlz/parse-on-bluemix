// Licensed under the Apache License, Version 2.0 (the 'License'); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

'use strict';

// Required Libs
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var http = require('http');

// Start Express
var app = express();

// Validate Keys
if (!process.env.APP_ID) {
  throw 'Please apply the Application ID from Parse.com';
}

if (!process.env.MASTER_KEY) {
  throw 'Please apply the Master Key from Parse.com';
}

if (process.env.DATABASE_URI) {
  var databaseUri = process.env.DATABASE_URI;
} else if (process.env.VCAP_SERVICES) {
  // var vcapServicesString = '{"user-provided": [{"name": "MongoDB by Compose-bd","label": "user-provided","credentials": {"uri": "cockney.4.mongolayer.com:10120/elsmore","port": "10120","user": "elsmore","password": "OrgGZOppyLsDY2J1"}}]}';
  var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
  const pattern = /mongo/i;
  for (var i = 0; i < vcapServices['user-provided'].length; i++) {
    if (vcapServices['user-provided'][i].name.search(pattern) >= 0 ||
      vcapServices['user-provided'][i].credentials.uri.search(pattern) >= 0) {
      var databaseUri = 'mongodb://' +
        vcapServices['user-provided'][i].credentials.user +
        ':' + vcapServices['user-provided'][i].credentials.passwod +
        '@' + vcapServices['user-provided'][i].credentials.uri +
        ':' + vcapServices['user-provided'][i].credentials.port +
        '/' + vcapServices['user-provided'][i].credentials.user;
      break;
    }
  }

} else {
  throw 'Please provide DATABASE_URI to an instance of MongoDB or deploy to Bluemix with a Compose MongoDB service';
}

// Specify the connection string for your mongodb database
// and the location to your Parse cloud code
var parseConfig = {
  databaseURI: databaseUri,
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
};

// Optional Keys
if (process.env.FILE_KEY) {
  parseConfig.fileKey = process.env.FILE_KEY;
}

if (process.env.CLIENT_KEY) {
  parseConfig.clientKey = process.env.CLIENT_KEY;
}

if (process.env.JS_KEY) {
  parseConfig.javascriptKey = process.env.JS_KEY;
}

if (process.env.REST_KEY) {
  parseConfig.restAPIKey = process.env.REST_KEY;
}

if (process.env.DOTNET_KEY) {
  parseConfig.dotNetKey = process.env.DOTNET_KEY;
}

// Create Parse Server instance
var api = new ParseServer(parseConfig);

// Serve the Parse API on the / URL prefix
var mountPath = process.env.PARSE_MOUNT || '/';
app.use(mountPath, api);

// And listen to requests
var port = process.env.VCAP_APP_PORT || process.env.PORT || 1337;
var host = process.env.VCAP_APP_HOST || 'localhost';
app.listen(port, host, function() {
  console.log('parse-server running on port ' + port + '.');
});
