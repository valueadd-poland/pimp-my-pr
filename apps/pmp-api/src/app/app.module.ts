import { Module } from '@nestjs/common';
import { ServerRepositoryApiRestModule } from '@pimp-my-pr/server/repository/api-rest';
import { ServerSharedCoreModule } from '@pimp-my-pr/server/shared/core';
import { ServerAuthApiRestModule } from '@pimp-my-pr/server/auth/api-rest';

@Module({
  imports: [ServerRepositoryApiRestModule, ServerSharedCoreModule, ServerAuthApiRestModule]
})
export class AppModule {}
