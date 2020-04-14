import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ServerAuthCoreApplicationServicesModule } from '@pimp-my-pr/server/auth/core/application-services';
import { AuthTokenRepository } from '@pimp-my-pr/server/auth/core/domain-services';
import {
  AuthTokenRepositoryAdapter,
  ServerAuthInfrastructureModule
} from '@pimp-my-pr/server/auth/infrastructure';
import { PmpApiConfigService, ServerSharedCoreModule } from '@pimp-my-pr/server/shared/core';

const providers = [{ provide: AuthTokenRepository, useExisting: AuthTokenRepositoryAdapter }];

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ServerSharedCoreModule],
      inject: [PmpApiConfigService],
      useFactory: (configService: PmpApiConfigService) => ({
        secret: configService.getJwtSecret()
      })
    }),
    ServerAuthInfrastructureModule,
    ServerAuthCoreApplicationServicesModule
  ],
  providers,
  exports: [...providers, ServerAuthCoreApplicationServicesModule, JwtModule]
})
export class ServerAuthShellModule {}
