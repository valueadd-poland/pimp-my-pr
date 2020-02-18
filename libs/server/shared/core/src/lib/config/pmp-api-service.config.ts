import { ConfigService, registerAs } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

const CONFIG_NAMESPACE = 'pmp-api-service';

export const pmpApiServiceConfig = registerAs(CONFIG_NAMESPACE, () => ({
  githubToken: process.env.PMP_API_SERVICE_GITHUB_TOKEN,
  repositoryTitle: process.env.PMP_API_SERVICE_REPOSITORY_TITLE,
  repositoryOwner: process.env.PMP_API_SERVICE_REPOSITORY_OWNER
}));

@Injectable()
export class PmpApiServiceConfigService {
  constructor(private configService: ConfigService) {}

  getGithubToken(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.githubToken');
  }

  getRepositoryOwner(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.repositoryOwner');
  }

  getRepositoryTitle(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.repositoryTitle');
  }
}
