import { HttpModule, Module } from '@nestjs/common';
import { AuthRepository } from './repositories/auth.repository';
import { ServerSharedCoreModule } from '@pimp-my-pr/server/shared/core';

@Module({
  imports: [HttpModule, ServerSharedCoreModule],
  providers: [AuthRepository],
  exports: [AuthRepository]
})
export class ServerAuthInfrastructureModule {}
