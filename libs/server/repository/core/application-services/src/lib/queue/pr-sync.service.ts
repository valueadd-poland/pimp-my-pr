import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { PR_QUEUE_NAME, PrSyncJob } from '@pimp-my-pr/server/repository/core/domain';
import { Queue } from 'bull';
import { Platform } from '@pimp-my-pr/shared/domain';

@Injectable()
export class PrSyncService {
  constructor(@InjectQueue(PR_QUEUE_NAME) private prQueue: Queue<PrSyncJob>) {}
  async syncPrsInBackground(
    repositoryId: string,
    repositoryName: string,
    token: string,
    platform: Platform
  ): Promise<void> {
    await this.prQueue.add({
      repositoryId,
      token,
      platform,
      repositoryName
    });
  }
}
