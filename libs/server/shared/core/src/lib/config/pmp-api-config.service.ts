import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';

const CONFIG_NAMESPACE = 'pmp-api-service';

export const pmpApiConfigService = registerAs(CONFIG_NAMESPACE, () => ({
  githubToken: process.env.PMP_API_SERVICE_GITHUB_TOKEN,
  db: {
    host: process.env.PMP_API_SERVICE_DB_HOST,
    name: process.env.PMP_API_SERVICE_DB_NAME,
    password: process.env.PMP_API_SERVICE_DB_PASSWORD,
    user: process.env.PMP_API_SERVICE_DB_USER
  }
}));

@Injectable()
export class PmpApiConfigService {
  constructor(private configService: ConfigService) {}

  getGithubToken(): string {
    return this.configService.get<string>(CONFIG_NAMESPACE + '.githubToken');
  }

  getDbConfig(): { host: string; name: string; password: string; user: string } {
    return this.configService.get(CONFIG_NAMESPACE + '.db');
  }
}
