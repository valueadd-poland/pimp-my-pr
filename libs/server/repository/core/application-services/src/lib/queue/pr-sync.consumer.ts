import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import {
  PR_QUEUE_NAME,
  PrEntity,
  PrState,
  PrSyncJob
} from '@pimp-my-pr/server/repository/core/domain';
import {
  PrRepository,
  RemotePrRepository,
  remotePrRepositoryFactoryToken
} from '@pimp-my-pr/server/repository/core/domain-services';
import { traversePagesUntilGen } from '@pimp-my-pr/server/repository/util';
import { Inject } from '@nestjs/common';
import { Platform } from '@pimp-my-pr/shared/domain';

@Processor(PR_QUEUE_NAME)
export class PrSyncConsumer {
  constructor(
    private prRepository: PrRepository,
    @Inject(remotePrRepositoryFactoryToken)
    private prRepositoryFactory: (platform: Platform) => RemotePrRepository
  ) {}

  @Process()
  async syncPrs(job: Job<PrSyncJob>): Promise<void> {
    const prRepository = this.prRepositoryFactory(job.data.platform);
    const prFetcher = traversePagesUntilGen<PrEntity>(
      async page =>
        await prRepository.findByRepositoryId(job.data.repositoryName, job.data.token, {
          prState: PrState.OPEN,
          page,
          onPage: 100
        }),
      100
    );
    for await (const prsBatch of prFetcher) {
      for (const pr of prsBatch) {
        try {
          delete pr.id;
          delete pr.author.id;
          await this.prRepository.save(pr);
        } catch (ex) {
          console.log(ex);
        }
      }
    }
  }
}
