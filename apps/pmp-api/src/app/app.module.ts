import { Module } from '@nestjs/common';
import { ServerAuthApiRestModule } from '@pimp-my-pr/server/auth/api-rest';
import { ServerRepositoryApiRestModule } from '@pimp-my-pr/server/repository/api-rest';
import { ServerSharedCoreModule } from '@pimp-my-pr/server/shared/core';

@Module({
  imports: [ServerRepositoryApiRestModule, ServerSharedCoreModule, ServerAuthApiRestModule]
})
export class AppModule {}
