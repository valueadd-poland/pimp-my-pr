import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PR_QUEUE_NAME } from '@pimp-my-pr/server/repository/core/domain';
import { PrSyncService } from './pr-sync.service';
import { PrSyncConsumer } from './pr-sync.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: PR_QUEUE_NAME
    })
  ],
  providers: [PrSyncService, PrSyncConsumer],
  exports: [PrSyncService]
})
export class PrQueueModule {}
