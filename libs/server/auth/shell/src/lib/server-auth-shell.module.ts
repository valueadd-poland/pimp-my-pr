import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ServerAuthCoreApplicationServicesModule } from '@pimp-my-pr/server/auth/core/application-services';
import { authTokenRepositoryFactoryToken } from '@pimp-my-pr/server/auth/core/domain-services';
import {
  authTokenRepositoryFactory,
  BitbucketAuthTokenRepository,
  GithubAuthTokenRepository,
  ServerAuthInfrastructureModule
} from '@pimp-my-pr/server/auth/infrastructure';
import { PmpApiConfigService, ServerSharedCoreModule } from '@pimp-my-pr/server/shared/core';
import { ServerUserShellModule } from '@pimp-my-pr/server/user/public';

const providers = [
  {
    provide: authTokenRepositoryFactoryToken,
    useFactory: authTokenRepositoryFactory,
    inject: [GithubAuthTokenRepository, BitbucketAuthTokenRepository]
  }
];

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
    ServerAuthCoreApplicationServicesModule,
    ServerUserShellModule
  ],
  providers,
  exports: [...providers, ServerUserShellModule, ServerAuthCoreApplicationServicesModule, JwtModule]
})
export class ServerAuthShellModule {}
