import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';

const CONFIG_NAMESPACE = 'pmp-api-service';

export const pmpApiConfigService = registerAs(CONFIG_NAMESPACE, () => ({
  auth: {
    jwtSecret: process.env.AUTH_JWT_SECRET,
    remoteTokenCryptoKey: process.env.AUTH_REMOTE_TOKEN_CRYPTO_KEY
  },
  bitbucketClientId: process.env.BITBUCKET_CLIENT_ID,
  bitbucketClientSecret: process.env.BITBUCKET_CLIENT_SECRET,
  bitbucketToken: process.env.PMP_SERVER_BITBUCKET_TOKEN,
  githubToken: process.env.PMP_SERVER_GITHUB_TOKEN,
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    user: process.env.DB_USER
  },
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  gitlabClientId: process.env.GITLAB_CLIENT_ID,
  gitlabClientSecret: process.env.GITLAB_CLIENT_SECRET,
  gitlabRedirectUri: process.env.GITLAB_REDIRECT_URI,
  gitlabToken: process.env.PMP_SERVER_GITLAB_TOKEN,
  jwtSecret: process.env.PMP_SERVER_JWT_SECRET
}));

@Injectable()
export class PmpApiConfigService {
  constructor(private configService: ConfigService) {}

  getBitbucketClientId(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.bitbucketClientId');
  }

  getBitbucketClientSecret(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.bitbucketClientSecret');
  }

  getDbConfig(): { host: string; name: string; password: string; port: number; user: string } {
    return this.configService.get(CONFIG_NAMESPACE + '.db');
  }

  getGithubClientId(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.githubClientId');
  }

  getGithubClientSecret(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.githubClientSecret');
  }

  getGitlabClientId(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.gitlabClientId');
  }

  getGitlabClientSecret(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.gitlabClientSecret');
  }

  getGitlabRedirectUri(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.gitlabRedirectUri');
  }

  getJwtSecret(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.auth.jwtSecret');
  }

  getRemoteTokenCryptoKey(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.auth.remoteTokenCryptoKey');
  }
}
