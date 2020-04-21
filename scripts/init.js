'use strict';
exports.__esModule = true;
var dotenv_1 = require('dotenv');
var fs = require('fs');
dotenv_1.config();
var _a = process.env,
  GITHUB_CLIENT_ID = _a.GITHUB_CLIENT_ID,
  BITBUCKET_CLIENT_ID = _a.BITBUCKET_CLIENT_ID;
function initPmpWebEnvironment() {
  var devEnvironmentFile = 'libs/pmp-web/shared/config/src/lib/environment/environment.ts';
  var prodEnvironmentFile = 'libs/pmp-web/shared/config/src/lib/environment/environment.prod.ts';
  fs.copyFileSync(
    'libs/pmp-web/shared/config/src/lib/environment/environment.sample.ts',
    devEnvironmentFile
  );
  fs.copyFileSync(
    'libs/pmp-web/shared/config/src/lib/environment/environment.prod.sample.ts',
    prodEnvironmentFile
  );
  replaceInFiles('{{githubClientId}}', GITHUB_CLIENT_ID, [devEnvironmentFile, prodEnvironmentFile]);
  replaceInFiles('{{bitbucketClientId}}', BITBUCKET_CLIENT_ID, [
    devEnvironmentFile,
    prodEnvironmentFile
  ]);
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
