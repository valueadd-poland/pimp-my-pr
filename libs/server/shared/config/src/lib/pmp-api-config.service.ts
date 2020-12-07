import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';

const CONFIG_NAMESPACE = 'pmp-api-service';

export const pmpApiConfigService = registerAs(CONFIG_NAMESPACE, () => ({
  app: {
    domain: process.env.DOMAIN
  },
  auth: {
    jwtSecret: process.env.AUTH_JWT_SECRET,
    remoteTokenCryptoKey: process.env.AUTH_REMOTE_TOKEN_CRYPTO_KEY
  },
  bitbucket: {
    clientId: process.env.BITBUCKET_CLIENT_ID,
    clientSecret: process.env.BITBUCKET_CLIENT_SECRET
  },
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    user: process.env.DB_USER
  },
  github: {
    token: process.env.PMP_SERVER_GITHUB_TOKEN,
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  },
  gitlab: {
    clientId: process.env.GITLAB_CLIENT_ID,
    clientSecret: process.env.GITLAB_CLIENT_SECRET,
    redirectUri: process.env.GITLAB_REDIRECT_URI
  }
}));

@Injectable()
export class PmpApiConfigService {
  constructor(private configService: ConfigService) {}

  getAppDomain(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.app.domain');
  }

  getBitbucketClientId(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.bitbucket.clientId');
  }

  getBitbucketClientSecret(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.bitbucket.clientSecret');
  }

  getDbConfig(): { host: string; name: string; password: string; port: number; user: string } {
    return this.configService.get(CONFIG_NAMESPACE + '.db');
  }

  getGithubClientId(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.github.clientId');
  }

  getGithubClientSecret(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.github.clientSecret');
  }

  getGitlabClientId(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.gitlab.clientId');
  }

  getGitlabClientSecret(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.gitlab.clientSecret');
  }

  getGitlabRedirectUri(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.gitlab.redirectUri');
  }

  getJwtSecret(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.auth.jwtSecret');
  }

  getRemoteTokenCryptoKey(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.auth.remoteTokenCryptoKey');
  }
}
