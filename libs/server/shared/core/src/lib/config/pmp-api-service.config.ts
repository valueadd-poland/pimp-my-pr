import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';

const CONFIG_NAMESPACE = 'pmp-api-service';

export const pmpApiServiceConfig = registerAs(CONFIG_NAMESPACE, () => ({
  githubToken: process.env.PMP_API_SERVICE_GITHUB_TOKEN,
  repositories: process.env.PMP_API_SERVICE_REPOSITORIES.split(',')
}));

@Injectable()
export class PmpApiServiceConfigService {
  constructor(private configService: ConfigService) {}

  getGithubToken(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.githubToken');
  }

  getRepositories(): string[] {
    return this.configService.get<string[]>(CONFIG_NAMESPACE + '.repositories');
  }
}
