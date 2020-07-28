'use strict';
exports.__esModule = true;
var dotenv_1 = require('dotenv');
var fs = require('fs');
dotenv_1.config();
var _a = process.env,
  GITHUB_CLIENT_ID = _a.GITHUB_CLIENT_ID,
  BITBUCKET_CLIENT_ID = _a.BITBUCKET_CLIENT_ID,
  GITLAB_CLIENT_ID = _a.GITLAB_CLIENT_ID,
  GITLAB_REDIRECT_URI = _a.GITLAB_REDIRECT_URI,
  GOOGLE_ANALYTICS_ID = _a.GOOGLE_ANALYTICS_ID;
function initPmpWebEnvironment() {
  var environmentFile = 'apps/pmp-web/src/assets/env/env.json';
  fs.copyFileSync('apps/pmp-web/src/assets/env/env.json.sample', environmentFile);
  replaceInFiles(
    '"{{githubClientId}}"',
    '' + (GITHUB_CLIENT_ID ? '"' + GITHUB_CLIENT_ID + '"' : null),
    [environmentFile]
  );
  replaceInFiles(
    '"{{bitbucketClientId}}"',
    '' + (BITBUCKET_CLIENT_ID ? '"' + BITBUCKET_CLIENT_ID + '"' : null),
    [environmentFile]
  );
  replaceInFiles(
    '"{{gitlabClientId}}"',
    '' + (GITLAB_CLIENT_ID ? '"' + GITLAB_CLIENT_ID + '"' : null),
    [environmentFile]
  );
  replaceInFiles(
    '"{{gitlabRedirectUri}}"',
    '' + (GITLAB_REDIRECT_URI ? '"' + GITLAB_REDIRECT_URI + '"' : null),
    [environmentFile]
  );
  replaceInFiles(
    '"{{googleAnalyticsId}}"',
    '' + (GOOGLE_ANALYTICS_ID ? '"' + GOOGLE_ANALYTICS_ID + '"' : null),
    [environmentFile]
  );
}
function replaceInFiles(from, to, files) {
  for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
    var file = files_1[_i];
    var fileContent = fs.readFileSync(file, 'utf8');
    var newContent = fileContent.replace(from, to);
    fs.writeFileSync(file, newContent, 'utf8');
  }
}
initPmpWebEnvironment();
