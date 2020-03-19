import { Global, Module } from '@nestjs/common';
import { ServerAuthCoreApplicationServicesModule } from '@pimp-my-pr/server/auth/core/application-services';
import { BaseAuthRepository } from '@pimp-my-pr/server/auth/core/domain-services';
import { AuthRepository } from '@pimp-my-pr/server/auth/infrastructure';
import { ServerSharedCoreModule, PmpApiConfigService } from '@pimp-my-pr/server/shared/core';
import { JwtModule } from '@nestjs/jwt';

const providers = [{ provide: BaseAuthRepository, useClass: AuthRepository }];

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
    ServerAuthCoreApplicationServicesModule
  ],
  providers,
  exports: [...providers, ServerAuthCoreApplicationServicesModule, JwtModule]
})
export class ServerAuthShellModule {}
