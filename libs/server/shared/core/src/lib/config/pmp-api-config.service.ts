import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';

const CONFIG_NAMESPACE = 'pmp-api-service';

export const pmpApiConfigService = registerAs(CONFIG_NAMESPACE, () => ({
  bitbucketClientId: process.env.PMP_SERVER_BITBUCKET_CLIENT_ID,
  bitbucketClientSecret: process.env.PMP_SERVER_BITBUCKET_CLIENT_SECRET,
  bitbucketToken: process.env.PMP_API_SERVICE_BITBUCKET_TOKEN,
  githubToken: process.env.PMP_API_SERVICE_GITHUB_TOKEN,
  db: {
    host: process.env.PMP_API_SERVICE_DB_HOST,
    name: process.env.PMP_API_SERVICE_DB_NAME,
    password: process.env.PMP_API_SERVICE_DB_PASSWORD,
    user: process.env.PMP_API_SERVICE_DB_USER
  },
  githubClientId: process.env.PMP_SERVER_GITHUB_CLIENT_ID,
  githubClientSecret: process.env.PMP_SERVER_GITHUB_CLIENT_SECRET,
  jwtSecret: process.env.PMP_SERVER_GITHUB_JWT_SECRET
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

  getBitbucketToken(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.bitbucketToken');
  }

  getDbConfig(): { host: string; name: string; password: string; user: string } {
    return this.configService.get(CONFIG_NAMESPACE + '.db');
  }

  getGithubClientId(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.githubClientId');
  }

  getGithubClientSecret(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.githubClientSecret');
  }

  getJwtSecret(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.jwtSecret');
  }
}
