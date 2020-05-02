import { Module } from '@nestjs/common';
import { ServerAuthApiRestModule } from '@pimp-my-pr/server/auth/api-rest';
import { ServerRepositoryApiRestModule } from '@pimp-my-pr/server/repository/api-rest';
import { ServerSharedCoreModule } from '@pimp-my-pr/server/shared/core';
import { ServerSharedCoreApiRestModule } from '@pimp-my-pr/server/shared/core-api-rest';
import { ServerUserApiRestModule } from '@pimp-my-pr/server/user/api-rest';

@Module({
  imports: [
    ServerSharedCoreModule,
    ServerSharedCoreApiRestModule,
    ServerAuthApiRestModule,
    ServerRepositoryApiRestModule,
    ServerUserApiRestModule
  ]
})
export class AppModule {}
