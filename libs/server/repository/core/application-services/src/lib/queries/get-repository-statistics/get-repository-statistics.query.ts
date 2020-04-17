import { Platform } from '@pimp-my-pr/shared/domain';

export class GetRepositoryStatisticsQuery {
  constructor(public repositoryId: string, public token: string, public platform: Platform) {}
}
