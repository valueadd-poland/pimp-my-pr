import { Platform } from '@pimp-my-pr/shared/domain';

export interface PrSyncJob {
  repositoryId: string;
  repositoryName: string;
  token: string;
  platform: Platform;
}
