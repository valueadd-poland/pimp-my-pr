'use strict';
exports.__esModule = true;
var dotenv_1 = require('dotenv');
var fs = require('fs');
dotenv_1.config();
var PMP_SERVER_GITHUB_CLIENT_ID = process.env.PMP_SERVER_GITHUB_CLIENT_ID;
function initPmpWebEnvironment() {
  var devEnvironmentFile = 'libs/pmp-web/core/src/lib/environment/environment.ts';
  var prodEnvironmentFile = 'libs/pmp-web/core/src/lib/environment/environment.prod.ts';
  fs.copyFileSync(
    'libs/pmp-web/core/src/lib/environment/environment.sample.ts',
    devEnvironmentFile
  );
  fs.copyFileSync(
    'libs/pmp-web/core/src/lib/environment/environment.prod.sample.ts',
    prodEnvironmentFile
  );
  replaceInFile('{{githubClientId}}', PMP_SERVER_GITHUB_CLIENT_ID, devEnvironmentFile);
  replaceInFile('{{githubClientId}}', PMP_SERVER_GITHUB_CLIENT_ID, prodEnvironmentFile);
}
function replaceInFile(from, to, file) {
  var fileContent = fs.readFileSync(file, 'utf8');
  var newContent = fileContent.replace(from, to);
  fs.writeFileSync(file, newContent, 'utf8');
}
initPmpWebEnvironment();
