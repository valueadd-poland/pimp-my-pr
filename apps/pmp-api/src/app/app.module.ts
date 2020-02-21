import { Module } from '@nestjs/common';
import { ServerRepositoryApiRestModule } from '@pimp-my-pr/server/repository/api-rest';
import { ServerSharedCoreModule } from '@pimp-my-pr/server/shared/core';

@Module({
  imports: [ServerRepositoryApiRestModule, ServerSharedCoreModule]
})
export class AppModule {}
