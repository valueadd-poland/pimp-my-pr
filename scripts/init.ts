import { config } from 'dotenv';
import * as fs from 'fs';

config();

const {
  GITHUB_CLIENT_ID,
  BITBUCKET_CLIENT_ID,
  GITLAB_CLIENT_ID,
  GITLAB_CLIENT_SECRET,
  GITLAB_REDIRECT_URI
} = process.env;

function initPmpWebEnvironment(): void {
  const devEnvironmentFile = 'libs/pmp-web/shared/config/src/lib/environment/environment.ts';
  const prodEnvironmentFile = 'libs/pmp-web/shared/config/src/lib/environment/environment.prod.ts';

  fs.copyFileSync(
    'libs/pmp-web/shared/config/src/lib/environment/environment.sample.ts',
    devEnvironmentFile
  );
  fs.copyFileSync(
    'libs/pmp-web/shared/config/src/lib/environment/environment.prod.sample.ts',
    prodEnvironmentFile
  );

  replaceInFiles(
    `'{{githubClientId}}'`,
    `${GITHUB_CLIENT_ID ? `'${GITHUB_CLIENT_ID}'` : undefined}`,
    [devEnvironmentFile, prodEnvironmentFile]
  );
  replaceInFiles(
    `'{{bitbucketClientId}}'`,
    `${BITBUCKET_CLIENT_ID ? `'${BITBUCKET_CLIENT_ID}'` : undefined}`,
    [devEnvironmentFile, prodEnvironmentFile]
  );
  replaceInFiles(
    `'{{gitlabClientId}}'`,
    `${GITLAB_CLIENT_ID ? `'${GITLAB_CLIENT_ID}'` : undefined}`,
    [devEnvironmentFile, prodEnvironmentFile]
  );
  replaceInFiles(
    `'{{gitlabClientSecret}}'`,
    `${GITLAB_CLIENT_SECRET ? `'${GITLAB_CLIENT_SECRET}'` : undefined}`,
    [devEnvironmentFile, prodEnvironmentFile]
  );
  replaceInFiles(
    `'{{gitlabRedirectUri}}'`,
    `${GITLAB_REDIRECT_URI ? `'${GITLAB_REDIRECT_URI}'` : undefined}`,
    [devEnvironmentFile, prodEnvironmentFile]
  );
}

function replaceInFiles(from: string, to: string, files: string[]): void {
  for (const file of files) {
    const fileContent = fs.readFileSync(file, 'utf8');
    const newContent = fileContent.replace(from, to);

    fs.writeFileSync(file, newContent, 'utf8');
  }
}

initPmpWebEnvironment();
