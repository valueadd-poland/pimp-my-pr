import { config } from 'dotenv';
import * as fs from 'fs';

config();

const {
  GITHUB_CLIENT_ID,
  BITBUCKET_CLIENT_ID,
  GITLAB_CLIENT_ID,
  GITLAB_REDIRECT_URI
} = process.env;

function initPmpWebEnvironment(): void {
  const environmentFile = 'apps/pmp-web/src/assets/env/env.json';

  fs.copyFileSync('apps/pmp-web/src/assets/env/env.json.sample', environmentFile);

  replaceInFiles(`"{{githubClientId}}"`, `${GITHUB_CLIENT_ID ? `"${GITHUB_CLIENT_ID}"` : null}`, [
    environmentFile
  ]);
  replaceInFiles(
    `"{{bitbucketClientId}}"`,
    `${BITBUCKET_CLIENT_ID ? `"${BITBUCKET_CLIENT_ID}"` : null}`,
    [environmentFile]
  );
  replaceInFiles(`"{{gitlabClientId}}"`, `${GITLAB_CLIENT_ID ? `"${GITLAB_CLIENT_ID}"` : null}`, [
    environmentFile
  ]);
  replaceInFiles(
    `"{{gitlabRedirectUri}}"`,
    `${GITLAB_REDIRECT_URI ? `"${GITLAB_REDIRECT_URI}"` : null}`,
    [environmentFile]
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
